import { Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clinetfull',
  templateUrl: './clinetfull.component.html',
  styleUrls: ['./clinetfull.component.scss']
})
export class ClinetfullComponent implements OnInit {

  private themeWrapper = document.getElementsByClassName('bg-primary');
  public config: PerfectScrollbarConfigInterface = {};
  userData: any;
  Skin: any;
  logoimage: string | any;
  companyName: string | any;
  public id = 0;
  constructor(public router: Router,
    public _route: ActivatedRoute) {

    this.id = this._route.snapshot.params.id;

  }

  public innerWidth: number = 0;
  public defaultSidebar: string = '';
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = 'mini-sidebar';
  toggleSidebar = new EventEmitter<void>();
  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/starter']);
    }
    debugger
    this.sessionCheck();
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
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
