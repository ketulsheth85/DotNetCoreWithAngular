import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  userData: any;
  private spinner: NgxSpinnerService| any;
  constructor(private router: Router,spinner: NgxSpinnerService) {
    
    if (localStorage.getItem('userSession') == null) {
      this.router.navigate(['/login']);
    }
    this.spinner = spinner;
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() { }
  ngOnInit(): void {
    
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
  }
}
