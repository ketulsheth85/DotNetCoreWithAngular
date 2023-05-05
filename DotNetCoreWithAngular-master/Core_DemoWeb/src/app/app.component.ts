import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `<notifier-container></notifier-container>`
})
export class AppComponent {
  title = 'Core_Demo';
  constructor(private _route: Router) {

    // if (localStorage.getItem("userSession") != null) {
    //   //this._route.navigate(['/dashboard']);
    // }
    // else {

    // }
  }
}
