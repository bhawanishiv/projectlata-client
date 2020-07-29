import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Pin } from 'src/app/models/cpu.model';
import { PinConfigurationService } from 'src/app/services/pin-configuration.service';
import { Subscription } from 'rxjs';
import { Instance } from 'src/app/models/instance.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { database } from 'firebase';
import { flatMap } from 'rxjs/operators';
interface AddPinNameDialogData {
  mode: string,
  pinNo: string,
  pinName: string
}

@Component({
  selector: 'instance-settings-add-pin-configuration',
  templateUrl: './instance-settings-add-pin-configuration.component.html',
  styleUrls: ['./instance-settings-add-pin-configuration.component.scss']
})
export class InstanceSettingsAddPinConfigurationComponent implements OnInit, OnDestroy {

  @Input('instance') instance: Instance;
  inputPins: Pin[] = [];
  outputPins: Pin[] = [];
  availablePinConfigurations: Pin[] = [];
  nAllowedPin: number;
  pinConfigurationReceived: boolean = false;
  disabled: boolean = false;
  statusText: string = null;
  subscription: Subscription;
  constructor(
    private pinConfigService: PinConfigurationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getNSetPinConfigurations()
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  drop(event: CdkDragDrop<Pin[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  getNSetPinConfigurations() {
    this.subscription = this.pinConfigService.getCPUPConfiguration(this.instance.cpuId)
      .subscribe(pinConfigurations => {
        if (!pinConfigurations || !(pinConfigurations.length > 0)) return;
        if (this.pinConfigurationReceived) return this.disable();
        this.pinConfigurationReceived = true;
        this.availablePinConfigurations = pinConfigurations;
        this.nAllowedPin = pinConfigurations.filter(pin => !this.checkIfNotAllowed(pin.pinTypes)).length;
      })
  }

  checkIfNotAllowed(pinTypes: string[]) {
    return pinTypes.includes('power')
    // || pinTypes.includes('serial');
  }


  getNoOfPinsSelectedText(pins: Pin[]) {
    if (pins.length > 0) return `${pins.length} pins`
    return 'no pin selected'
  }

  getRemainingPins() {
    return this.availablePinConfigurations.filter(pin => !this.checkIfNotAllowed(pin.pinTypes));
  }
  getAllowedNoOfPins() {
    return this.nAllowedPin;
  }
  getRemainingNoOfPinsText() {
    let remainingPins = this.getRemainingPins()
    if (remainingPins.length > 0) return `${remainingPins.length} remaining`
    return 'no remaining pin';
  }

  getPinSelectionText() {
    let nRemainingPin = this.getRemainingPins().length;
    let nSelectedPin = this.inputPins.length + this.outputPins.length;
    if (this.getAllowedNoOfPins() == nSelectedPin) return `All ${nSelectedPin} pins selected`;
    else if (nSelectedPin == 0) return `No pins selected, ${this.getRemainingPins().length} pins remaining`;
    else if (nSelectedPin == 1) return `Total ${nSelectedPin} pin selected, ${nRemainingPin} remaining`;
    else if (nSelectedPin > 0) return `Total ${nSelectedPin} pins selected, ${nRemainingPin} remaining`;

  }
  disable(reason = 'newConfigs') {
    if (reason == 'newConfigs') this.statusText = 'New Pin Configuration found from server. Please refresh the page.';
    this.disabled = true;
  }

  openDialogForPinName(pinNo: string, mode: string = 'output') {
    const dialogRef = this.dialog.open(InstanceSettingsAppPinNameComponent, {
      disableClose: true,
      data: { pinNo: pinNo, mode: mode, pinName: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.setPinName(result.pinName, result.pinNo, result.mode);
    });
  }
  setPinName(pinName: string, pinNo: string, mode = 'output') {
    if (mode === 'output') return this.outputPins.find(pin => pin.pinNo == pinNo).pinName = pinName;
    this.inputPins.find(pin => pin.pinNo == pinNo).pinName = pinName;
  }
  savePinDefinition() {
    //If is disabled, return
    if (this.disabled) return;
    //Clear status text first
    this.statusText = '';
    //Respond as alteast on of the output should exits
    if (!(this.outputPins.length > 0)) return this.statusText = `Output should have atleast one pin.`;

    //if pin name is not set, return pin Name is not set
    //For output
    let __outputPins = this.validateSelectedPins(this.outputPins);
    if (!__outputPins) return this.statusText = `Some pins's name(s) aren't set.`;

    if (this.inputPins.length > 0) {
      //For input
      let __inputPins = this.validateSelectedPins(this.inputPins);
      if (!__inputPins) return this.statusText = `Some pins's name(s) aren't set.`;
    }

    let newPinArray: Pin[] = [
      ...this.createNewPinDefinition(this.inputPins, 'input'),
      ...this.createNewPinDefinition(this.outputPins, 'output')
    ];
    this.pinConfigService.set(this.instance.instanceId, newPinArray);
  }
  createNewPinDefinition(pins: Pin[], mode = 'output') {
    return pins.map(pin => { return { pinPort: pin.pinPort, pinName: pin.pinName, pinMode: mode, pinNo: pin.pinNo, pinTypes: pin.pinTypes } })
  }
  validateSelectedPins(pins: Pin[]) {
    return pins.some(pin => {
      let { pinName } = pin;
      if (!pinName) return false;
      if (pinName == '') return false;
      return true;
    })
  }
}

@Component({
  selector: 'instance-settings-add-pin-name',
  templateUrl: 'instance-settings-add-pin-name.component.html',
})
export class InstanceSettingsAppPinNameComponent implements OnInit {

  pinForm: FormGroup
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InstanceSettingsAppPinNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddPinNameDialogData) { }

  ngOnInit() {
    this.pinForm = this.fb.group({
      pinName: ['', [Validators.required, Validators.pattern(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g)]]
    })
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
  setError(error: any, control = 'pinName') {
    this.pinForm.get(control).setErrors(error);
    this.pinForm.updateValueAndValidity();
  }
  savePin(form: any) {
    if (!this.pinForm.valid) return;
    this.dialogRef.close({ pinNo: this.data.pinNo, mode: this.data.mode, pinName: form.pinName })
  }
}