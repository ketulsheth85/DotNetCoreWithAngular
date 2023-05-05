import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public userData: any;
  private notifier: NotifierService;
  constructor(private restService: RestService,
    notifier: NotifierService,
    private _route: Router) {
    this.notifier = notifier;
    if (localStorage.getItem('userSession') != null) {
      
      var user = localStorage.getItem('userSession');
      this.userData = JSON.parse((user != null ? user : ''));
      if (this.userData.roleId == 2) {
        this._route.navigate(["/clientcomponent/searchproduct"]);
      }
      else if (this.userData.roleId == 1) {
        this._route.navigate(["/dashboard"]);
      }
      else
      {
        this._route.navigate(["/login"]);
      }
    }
  }

  ngOnInit(): void {
    this.userData = {
      userId: 0, userName: "", userEmailId: "",
      lastName: "", firstName: "", password: "", companyId: 0, locationId: 0, employeeId: 0, phoneNo: "",
      mobile: "", fax: "", department: "", roleId: 0, op: 0
    };
  }
  onSubmit(value: any) {

    if (value.userName === '' && value.password === '') {

      this.notifier.notify('error', "Please fill user name and password");
    }
    else {
      this.restService.getAllData('User/GetUserLogin?userName=' + value.userName + '&password=' + value.password)
        .subscribe((res: any) => {

          if (res != null) {
            localStorage.setItem('userSession', JSON.stringify(res));
            if (res.roleId == 2) {
              this._route.navigate(["/clientcomponent/searchproduct"]);
            }
            else {
              this._route.navigate(["/dashboard"]);
            }
          }
          else {

            this.notifier.notify('error', "wrong user name and password");
          }
        })
    }

  }
}
