import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent implements OnInit {
  user$: Observable<AppUser>;
  links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'News', path: '/news' },
  ]

  footerText = 'Project LATA, an open platform';
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.auth.appUser$;

  }

}
