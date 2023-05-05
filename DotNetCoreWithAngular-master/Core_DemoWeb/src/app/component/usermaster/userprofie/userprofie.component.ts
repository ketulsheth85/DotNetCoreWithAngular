import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyData } from '../../companymaster/companymaster.metadata';
import { RestService } from '../../../rest.service';
import { RoleData, UserData } from '../usermaster.metadata';

@Component({
  selector: 'app-userprofie',
  templateUrl: './userprofie.component.html',
  styleUrls: ['./userprofie.component.css']
})
export class UserprofieComponent implements OnInit {

  public userdetail: any;
  public companydetail: CompanyData[] | any;
  public roledetail: RoleData[] | any;
  userData: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private restService: RestService) { }

    ngOnInit() {
      this.userdetail = {
        userId: 0, userName: "", userEmailId: "", selectCompanyId: '', selectedRoleId: '',
        lastName: "", firstName: "", companyId: 0, locationId: 0, employeeId: 0, phoneNo: "",
        mobile: "", userLocation: "", department: "", roleId: 0, isCompanyFlag: 0, createdBy: 0, op: 0
      };
      const id = this._route.snapshot.params.id;
      var user = localStorage.getItem('userSession');
      this.userData = JSON.parse((user != null ? user : ''));
      this.getUserDetails(this.userData.userId);
  }

  private getUserDetails(id: number) {
    this.restService.getAllData('User/GetUserList?id=' + id + '&companyId=' + this.userData.companyId
        + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
        .subscribe((result: any) => {
          
          this.userdetail = Object.assign({}, result[0]);
          this.userdetail.selectCompanyId = String(result[0].companyId)
          this.userdetail.selectedRoleId = String(result[0].roleId)
        }, error => console.error(error));
  }
}
