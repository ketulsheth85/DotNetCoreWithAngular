import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
//declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()
  
  toggleSidebar = new EventEmitter<void>();
  logOut() { 
    localStorage.clear();
    this._route.navigate(["/login"]);
  }
  public showSearch = false;
  userData: any;
  userName: any;
  constructor(private _route: Router) { 
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
  this.userName = this.userData.userName;
  }
  
  
}
