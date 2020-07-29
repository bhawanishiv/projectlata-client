import { Component, OnInit } from '@angular/core';
import { InstanceService } from 'src/app/services/instance.service';
import { Observable, of } from 'rxjs';
import { Instance } from 'src/app/models/instance.model';
import { Activity } from 'src/app/models/activity.model';
import { switchMap } from 'rxjs/operators';
import { ActivityService } from 'src/app/services/activity.service';
import { CPU } from 'src/app/models/modules.model';
import { ModuleService } from 'src/app/services/module.service';
import { PinConfigurationService } from 'src/app/services/pin-configuration.service';
import { CommandService } from 'src/app/services/command.service';
import { MatDialog } from '@angular/material/dialog';
import { NgpConfirmDialog } from 'src/app/modules/sharing/confirm-dialog';
import { ReadingService } from 'src/app/services/reading.service';

@Component({
  selector: 'app-instance-settings-general',
  templateUrl: './instance-settings-general.component.html',
  styleUrls: ['./instance-settings-general.component.scss']
})
export class InstanceSettingsGeneralComponent implements OnInit {

  instance$: Observable<Instance>;
  activity$: Observable<Activity>;
  cpu$: Observable<CPU>;
  cmnDevice$: Observable<CPU>;
  constructor(
    private moduleService: ModuleService,
    private pinService: PinConfigurationService,
    private cmdService: CommandService,
    private readingService: ReadingService,
    public dialog: MatDialog,
    private instanceService: InstanceService,
    private activityService: ActivityService) { }

  ngOnInit(): void {
    this.instance$ = this.instanceService.currentInstance$;
    this.activity$ = this.instance$.pipe(switchMap(instance => {
      return this.activityService.get(instance.activityId)
    }));
    this.cpu$ = this.instance$.pipe(switchMap(instance => {
      if (!instance) return of(null);
      return this.moduleService.getCPU(instance.cpuId);
    }));
    this.cmnDevice$ = this.instance$.pipe(switchMap(instance => {
      if (!instance) return of(null);
      return this.moduleService.getCPU(instance.comnDeviceId);
    }));
  }
  deleteInstance(instanceId: string) {
    const dialogRef = this.dialog.open(NgpConfirmDialog, {
      data: 'By deleting this, pin definitions, commands and responses related to this instance would also be deleted completely.'
    })
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (typeof result !== 'boolean') return;
      if (!result) return;
      console.log('sdf');
      this.cmdService.clearAll(instanceId);
      this.readingService.removeAll(instanceId);
      this.pinService.removeAll(instanceId);
      return this.instanceService.delete(instanceId);
    })
  }
}
