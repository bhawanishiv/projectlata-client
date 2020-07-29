import { Component, OnInit } from '@angular/core';

interface Link {
  href: string,
  name: string
}
@Component({
  selector: 'app-instance-settings-nav',
  templateUrl: './instance-settings-nav.component.html',
  styleUrls: ['./instance-settings-nav.component.scss']
})
export class InstanceSettingsNavComponent implements OnInit {

  links: Link[] = [
    { href: 'general', name: 'General' },
    { href: 'configure', name: 'Pin Configuration' },
    // { href: 'iam', name: "Managers" }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
