import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of, Subscription } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Instance } from 'src/app/models/instance.model';
import { AppUser } from 'src/app/models/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InstanceService } from 'src/app/services/instance.service';

@Component({
  selector: 'app-instance-nav',
  templateUrl: './instance-nav.component.html',
  styleUrls: ['./instance-nav.component.scss']
})
export class InstanceNavComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  availableInstances$: Observable<Instance[]>;
  currentInstance: Instance;
  appUserSubscription: Subscription;
  currentInstanceSubscription: Subscription = null;
  anotherSubscription: Subscription = null;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private instanceService: InstanceService) { }


  ngOnInit(): void {
    this.appUserSubscription = this.auth.appUser$.subscribe(appUser => {
      if (!appUser) return;
      this.appUser = appUser;
      this.availableInstances$ = this.instanceService.getInstancesByOwner(appUser.uid)
    });
    this.getNSetInstance();
  }
  ngOnDestroy() {
    this.currentInstanceSubscription.unsubscribe()
    this.anotherSubscription.unsubscribe()
  }

  getNSetInstance() {
    const instanceId = this.route.snapshot.params['instanceId'];
    if (instanceId)
      this.currentInstanceSubscription = this.instanceService.get(instanceId).subscribe(instance => this.setInstance(instance));
    this.anotherSubscription = this.getInstanceIdFromParams().subscribe(instance => this.setInstance(instance));
  }

  setInstance(instance: Instance) {
    const { instanceName } = instance;
    if (!instanceName) return this.router.navigate(['i']);
    this.currentInstance = instance;
    this.instanceService.setCurrentInstance(instance);
  }

  getInstanceIdFromParams() {
    return this.route.params.pipe(switchMap(route => {
      if (!route['instanceId']) return of(null)
      return this.instanceService.get(route['instanceId'])
    }))
  }

  routeToSelectedInstance(instanceId: string) {
    this.router.navigate(['i', instanceId]);
  }
}
