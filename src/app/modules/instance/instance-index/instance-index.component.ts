import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommandService } from 'src/app/services/command.service';
import { InstanceService } from 'src/app/services/instance.service';
import { Instance } from 'src/app/models/instance.model';
import { Subscription, Observable } from 'rxjs';
import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/models/activity.model';
import { PinConfigurationService } from 'src/app/services/pin-configuration.service';
import { Pin } from 'src/app/models/cpu.model';
import { Router } from '@angular/router';
import { ReadingService } from 'src/app/services/reading.service';

@Component({
  selector: 'app-instance-index',
  templateUrl: './instance-index.component.html',
  styleUrls: ['./instance-index.component.scss']
})
export class InstanceIndexComponent implements OnInit {


  filteredPinConfigurations: Pin[];
  instance: Instance;
  instanceSubscription: Subscription;
  pinsSubscription: Subscription;

  activity$: Observable<Activity>;
  constructor(
    private router: Router,
    private pinService: PinConfigurationService,
    private activityService: ActivityService,
    private instanceService: InstanceService) { }

  ngOnInit(): void {
    this.instanceSubscription = this.instanceService.currentInstance$.subscribe(instance => {
      if (!instance) return;
      this.instance = instance;
      this.activity$ = this.activityService.get(instance.activityId);
      this.pinsSubscription = this.pinService.getAll(instance.instanceId).subscribe(pinDefinitions =>
        this.filteredPinConfigurations = pinDefinitions.filter(pin => pin.pinMode == 'output'))
    });
  }
  ngOnDestroy() {
    if (!this.instanceSubscription) return;
    this.instanceSubscription.unsubscribe();
    if (!this.pinsSubscription) return;
    this.pinsSubscription.unsubscribe();
  }
  navToAddPinDefinition() {
    this.router.navigate(['i', this.instance.instanceId, 'settings', 'configure']);
  }
}
