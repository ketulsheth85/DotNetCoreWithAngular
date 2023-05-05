import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { menuitems } from '../../layouts/clientfullmenu/menu-items';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  userData: any;
  public sidebarnavItems: RouteInfo[] = [];
  public sidebarClientnavItems: RouteInfo[] = [];
  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    console.log(this.userData, "userData");
  }

  // End open close
  ngOnInit() {
    var list: any = [];
    ROUTES.forEach((el: any) => {
      if( this.userData.companyLevel == 0)
      {
        if (el.path == '/component/locationmaster') {
          el.show = false;
        }
        else
        {
          el.show = true;
        }
      }
    });
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.sidebarClientnavItems = menuitems.filter(sidebarClientnavItems => sidebarClientnavItems)
  }
}
