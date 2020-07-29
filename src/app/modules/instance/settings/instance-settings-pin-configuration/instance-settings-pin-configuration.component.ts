import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, AfterContentInit } from '@angular/core';
import { PinConfigurationService } from 'src/app/services/pin-configuration.service';
import { Observable, of, Subscription } from 'rxjs';
import { InstanceService } from 'src/app/services/instance.service';
import { switchMap } from 'rxjs/operators';
import { Instance } from 'src/app/models/instance.model';
import { config } from 'process';

@Component({
  selector: 'app-instance-settings-pin-configuration',
  templateUrl: './instance-settings-pin-configuration.component.html',
  styleUrls: ['./instance-settings-pin-configuration.component.scss']
})
export class InstanceSettingsPinConfigurationComponent implements OnInit, AfterContentInit, OnDestroy {
  configs: any[];
  instance: Instance;
  subscription: Subscription;
  @ViewChild('pinConfigurationTempl') pinConfigurationTempl: TemplateRef<any>;
  @ViewChild('noPinDefinition') noPinDefinition: TemplateRef<any>;
  @ViewChild('addPinConfigTempl') addPinConfigTempl: TemplateRef<any>;

  currentTempl: TemplateRef<any>;

  constructor(private pinService: PinConfigurationService,
    private instanceService: InstanceService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngAfterContentInit() {
    this.subscription = this.instanceService.currentInstance$.pipe(switchMap(instance => {
      if (!instance) return of(null);
      this.instance = instance;
      return this.pinService.getAll(instance.instanceId);
    })).subscribe(configs => {
      this.currentTempl = this.noPinDefinition;
      if (!configs || !(configs.length > 0)) return;
      this.configs = configs
      this.showAvailablePinConfigurations();
    });
  }
  showAddPinConfigTempl() {
    this.currentTempl = this.addPinConfigTempl;
  }
  showAvailablePinConfigurations() {
    this.currentTempl = this.pinConfigurationTempl;
  }
}
