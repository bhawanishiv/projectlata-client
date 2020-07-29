import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Pin } from 'src/app/models/cpu.model';
import { CommandService } from 'src/app/services/command.service';
import { ReadingService } from 'src/app/services/reading.service';
import { Subscription } from 'rxjs';
import { Command } from 'src/app/models/command.model';
import { Reading } from 'src/app/models/instance.model';

@Component({
  selector: 'instance-pin-cmd',
  templateUrl: './instance-pin-cmd.component.html',
  styleUrls: ['./instance-pin-cmd.component.scss']
})
export class InstancePinCmdComponent implements OnInit, OnDestroy {

  __statusString = { unavailable: 'unavailable', running: 'running', stopped: 'stopped' };
  statusText;
  @Input('instanceId') instanceId: string;
  @Input('pin') pin: Pin;
  commands: Command[];
  readings: Reading[];
  cmdSubscription: Subscription;
  cmdPinSubscription:Subscription;
  readingSubscription: Subscription;
  constructor(
    private cmdService: CommandService,
    private readingService: ReadingService,
  ) { }

  ngOnInit(): void {
    this.readingSubscription = this.readingService.getByPinNo(this.instanceId, this.pin.pinNo).subscribe(readings => {
      this.readings = readings;
      this.processReadings(readings);
    });
    this.cmdSubscription = this.cmdService.get(this.instanceId, this.pin.pinNo).subscribe(commands => this.commands = commands)
  }
  ngOnDestroy() {
    if (!this.readingSubscription) return;
    this.readingSubscription.unsubscribe()
    if (!this.cmdSubscription) return;
    this.cmdSubscription.unsubscribe();
    if(!this.cmdPinSubscription) return;
    this.cmdPinSubscription.unsubscribe();
  }

  toggleSwitch() {
    if (this.getNextState()) return this.sendCommandToServer(1);
    return this.sendCommandToServer(0);
  }
  getNextState() {
    if (!this.commands || !this.readings) return true;
    if (this.commands.length > 0) {
      let latestCmd = this.commands[this.commands.length - 1]['val'];
      if (this.readings.length > 0) {
        let latestReading = this.readings[this.readings.length - 1]['reading'];
        if (+latestReading > 0 && latestCmd == 1) return false;
      }
      if (!latestCmd || latestCmd == 0) return true;
    }
    return true;
  }
  // if (!this.commands || !(this.commands.length > 0)) return this.sendCommandToServer(1);
  // let { val } = this.commands[this.commands.length - 1];
  // return this.sendCommandToServer(val == 1 ? 0 : 1);


  sendCommandToServer(newValue: number) {
    let time = new Date().toUTCString()
    this.cmdPinSubscription=this.cmdService.get(this.instanceId, this.pin.pinNo).subscribe(commands => {
      if (!commands) return this.cmdService.send(this.instanceId, this.pin.pinNo, { val: newValue, mode: 'client', time: time })
      if (commands.length > 0) {
        if (commands[commands.length - 1].val == newValue) return;
        return this.cmdService.send(this.instanceId, this.pin.pinNo, { val: newValue, mode: 'client', time: time })
      }
    });
  }
  processReadings(readings: Reading[]) {
    this.readings = readings;
    if (!readings || !(readings.length > 0)) return this.statusText = this.__statusString.unavailable;
    let { reading } = readings[readings.length - 1];
    if (!reading || +reading <= 0) return this.statusText = this.__statusString.stopped;
    return this.statusText = this.__statusString.running
  }

  routeToPinStatus(pinNo: string) {
    console.log(pinNo)
  }
}
