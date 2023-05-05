import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as $ from 'jquery';
import { environment } from '../../../environments/environment';
//declare var $: any;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  private themeWrapper = document.getElementsByClassName('bg-primary');
  public config: PerfectScrollbarConfigInterface = {};
  userData: any;
  Skin: any;
  url = '';
  logoimage: string | any;
  companyName: string | any;
  userName: any;
  title = '';
  constructor(public router: Router) {
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
  this.userName = this.userData.userName;
  }

  public innerWidth: number = 0;
  public defaultSidebar: string = '';
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = 'mini-sidebar';

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/starter']);
    }
    this.sessionCheck();
    this.url = environment.imageUrl;
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));

  this.logoimage = (this.userData.companyLogo || this.userData.companyLogo !== ''? this.url + this.userData.companyLogo : '../../assets/images/Logo/no_image.png') ;
    this.companyName = this.userData.companyName;
    this.title = (this.userData.companyLevel == 0 ? "Core_Demo Customer Relation management" :
      this.userData.companyLevel == 1 ? 'Core_Demo Service Management' : 'Customer portal')
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }
  sessionCheck() {
    var hours = 24; // Reset when storage is more than 24hours
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');

    if (setupTime == null) {

      localStorage.setItem('setupTime', now.toString())
    } else {
      if ((now - Number(setupTime)) > hours * 60 * 60 * 1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now.toString());
        this.router.navigate(['/login']);
      }
    }
  }

  logOut() { 
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  setMyBgColor(bgColorVal: any) {

    let styles: any;
    if (bgColorVal != "" && bgColorVal.indexOf("#") > -1
      && (bgColorVal.length == 4 || bgColorVal.length == 7) && bgColorVal != "#000" && bgColorVal != "#000000"
    ) {
      styles = {
        'background-color': bgColorVal
      };
    }
    else {
      styles = {
        'background-color': "#041f3e",
      };
    }
    return styles;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = 'mini-sidebar';
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case 'full':
        this.sidebartype = 'mini-sidebar';
        break;

      case 'mini-sidebar':
        this.sidebartype = 'full';
        break;
      default:
    }
  }
}
