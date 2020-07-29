import { Component, OnInit, Input } from '@angular/core';
import { AppUser } from 'src/app/models/auth';

@Component({
  selector: 'ngp-user-avatar',
  templateUrl: 'user-avatar.html',
  styleUrls: ['user-avatar.scss']
})
export class NgpUserAvatar {
  @Input('user') user: AppUser;
}
