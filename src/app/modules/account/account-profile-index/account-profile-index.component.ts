import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';


@Component({
  selector: 'app-account-profile-index',
  templateUrl: './account-profile-index.component.html',
  styleUrls: ['./account-profile-index.component.scss']
})
export class AccountProfileIndexComponent implements OnInit, OnDestroy {

  badges = []
  userSubscription: Subscription;
  user: AppUser;

  footerText = 'Project LATA, an open platform';
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.auth.appUser$.subscribe(appUser => {
      if (!appUser) return;
      this.user = appUser;
      this.getBadges(appUser.roles)
    })

  }
  getBadges(roles) {
    for (let role in roles) {
      if (roles[role] === true) this.badges.push(roles[role])
    }
  }

  ngOnDestroy() {
    this.userSubscription;
  }

  logout() {
    this.auth.logout();
  }
}
