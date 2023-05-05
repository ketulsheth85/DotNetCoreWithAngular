import { Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { RouteInfo } from 'src/app/shared/sidebar/sidebar.metadata';
import { environment } from 'src/environments/environment';
import { menuitems } from './menu-items';

@Component({
  selector: 'app-clientfullmenu',
  templateUrl: './clientfullmenu.component.html',
  styleUrls: ['./clientfullmenu.component.css']
})
export class ClientfullmenuComponent implements OnInit {

  public config: PerfectScrollbarConfigInterface = {};
  userData: any;
  Skin: any;
  logoimage: string | any;
  companyName: string | any;

  showMenu = false;
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[] = [];
  public id = 0;

  constructor(public router: Router,
    public _route: ActivatedRoute) {
    this.id = this._route.snapshot.params.id;

  }

  getProductDetails(id: number) {
    
    if (id == 0 || id == undefined) {
      this.showMenu = false;
    }
    else {
      this.showMenu = true;
    }
  }

  public innerWidth: number = 0;
  public defaultSidebar: string = '';
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = 'full';
  userName: any;
url='';
  Logo() {
    this.expandLogo = !this.expandLogo;
  }
  toggleSidebar = new EventEmitter<void>();
  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/starter']);
    }
    
    this.sidebarnavItems = menuitems.filter(sidebarnavItem => sidebarnavItem)
    var user = localStorage.getItem('userSession');
    this.url = environment.imageUrl;
    this.userData = JSON.parse((user != null ? user : ''));
    this.logoimage = this.url + this.userData.companyLogo;
    this.companyName = "Core_Demo";//this.userData.companyName;
    this.userName = this.userData.userName;
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();

  }
  setMyBgColor(bgColorVal: any) {
    let styles: any;
    if (bgColorVal != "" && bgColorVal.indexOf("#") > -1
      && bgColorVal.length >= 4 && bgColorVal != "#000" && bgColorVal != "#000000"
      && bgColorVal.length <= 7) {
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

  logOut() {
    localStorage.clear();
    this.router.navigate(["/login"]);
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
