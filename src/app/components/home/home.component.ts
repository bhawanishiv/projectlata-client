import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,
    private metaService:MetaService) { }

  ngOnInit(): void {
    this.metaService.setTitleOnly('Project LATA is an open platfrom to engage in machine devleopment activities. It\'s main focus is to make the machine learn pattern and recognition.');
  }
  navigateToMain(){
    this.router.navigate(['i']);
  }
}
