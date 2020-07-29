import { Instance } from 'src/app/models/instance.model';
import { InstanceService } from 'src/app/services/instance.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription, of, } from 'rxjs';
import { AppUser } from 'src/app/models/auth';
import { MatDialog } from '@angular/material/dialog';
import { InstanceCreateComponent } from '../instance-create/instance-create.component';
import { map, switchMap } from 'rxjs/operators';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-instance-select',
  templateUrl: './instance-select.component.html',
  styleUrls: ['./instance-select.component.scss'],
})
export class InstanceSelectComponent implements OnInit {

  appUser$: Observable<AppUser>;
  appUserSubscription: Subscription;
  instances$: Observable<Instance[]>;
  constructor(private instanceService: InstanceService,
    private auth: AuthService,
    private dialog: MatDialog,
    private metaService: MetaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.metaService.setTitle('Select or create an instance to work with');
    this.appUser$ = this.auth.appUser$.pipe(map(appUser => {
      if (!appUser) return null;
      this.instances$ = this.instanceService.getInstancesByOwner(appUser.uid).pipe(switchMap(ownerInstances => {
        return this.instanceService.getInstancesByIam(appUser.uid).pipe(map(iamInstances => {
          if (iamInstances.length > 0 && iamInstances[0] !== null) return [...iamInstances, ...ownerInstances];
          return ownerInstances;
        }))
      }))
      return appUser;
    }))
  }


  navigateToCreateInstance() {
    const dialogRef = this.dialog.open(InstanceCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.navigateToInstance(result);
    });
  }

  navigateToInstance(instanceId: string) {
    if (!instanceId) return;
    this.router.navigate([instanceId], { relativeTo: this.route });
  }
}
