import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Instance, Reading } from 'src/app/models/instance.model';
import { Pin } from 'src/app/models/cpu.model';
import { ReadingService } from 'src/app/services/reading.service';
import { EnergyControlService } from '../energy-control.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-energy-control-pin-status',
  templateUrl: './energy-control-pin-status.component.html',
  styleUrls: ['./energy-control-pin-status.component.scss']
})
export class EnergyControlPinStatusComponent implements OnInit, OnDestroy {

  @Input('instanceId') instanceId: string;
  @Input('pinNo') pinNo: string;

  status: { value: string, time: Date | string }
  subscription: Subscription;
  constructor(private readingsService: ReadingService,
    private energyControlService: EnergyControlService) { }

  ngOnInit(): void {
    this.getlastReading();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getlastReading() {
    this.subscription = this.readingsService.getByPinNo(this.instanceId, this.pinNo).pipe(map(readings => {
      if (!readings || !(readings.length > 0)) return { value: 'no readings found', time: new Date().toUTCString() };
      return { value: `${+readings[readings.length - 1]['reading']} Amp`, time: readings[readings.length - 1]['time'] };
    })).subscribe(status => this.status = status)
  }
}
