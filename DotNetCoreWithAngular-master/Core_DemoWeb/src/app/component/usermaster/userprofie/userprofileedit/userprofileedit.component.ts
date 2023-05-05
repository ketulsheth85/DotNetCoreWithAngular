import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyData } from '../../../companymaster/companymaster.metadata';
import { RestService } from '../../../../rest.service';
import { RoleData, UserData } from '../../usermaster.metadata';

@Component({
  selector: 'app-userprofileedit',
  templateUrl: './userprofileedit.component.html',
  styleUrls: ['./userprofileedit.component.css']
})
export class UserprofileeditComponent implements OnInit {
  public userdetail: any;
  public companydetail: CompanyData[] | any;
  public roledetail: RoleData[] | any;
  userData: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private restService: RestService) { }

  ngOnInit(): void {
    this.userdetail = {
      userId: 0, userName: "", userEmailId: "", selectCompanyId: '', selectedRoleId: '',
      lastName: "", firstName: "", companyId: 0, locationId: 0, employeeId: 0, phoneNo: "", companyName: "",
      mobile: "", userLocation: "", department: "", roleId: 0, isCompanyFlag: 0, createdBy: 0, op: 0,
      password : ""
    };
    const id = this._route.snapshot.params.id;
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.getCompanydata();
    this.getRoleData();
    this.getUserDetails(this.userData.userId);
  }

  private getCompanydata() {
    this.restService.getAllData('Company/GetCompanyList?id=0&companyId=' + this.userData.companyId)
      .subscribe((result: any) => {
        
        this.companydetail = result
      }, error => console.error());
  }
  setMyBgColor(bgColorVal: any) {
    let styles = {
      'background-color': bgColorVal
    };
    return styles;
  }
  private getUserDetails(id: number) {
    if (id === 0) {
      this.userdetail;
    }
    else {
      this.restService.getAllData('User/GetUserList?id=' + id + '&companyId=' + this.userData.companyId
        + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
        .subscribe((result: any) => {
          
          this.userdetail = Object.assign({}, result[0]);
          this.userdetail.selectCompanyId = String(result[0].companyId)
          this.userdetail.selectedRoleId = String(result[0].roleId)
        }, error => console.error(error));
    }
  }

  private getRoleData() {
    
    this.restService.getAllData('Company/GetRoleList').subscribe((result: any) => {
      this.roledetail = result
    }, error => console.error());
  }

  onCompanyChange(value: any) {
    this.userdetail.companyId = value.target.value;
  }

  onRoleChange(value: any) {
    this.userdetail.roleId = value.target.value;
  }

  onSubmit(value: any) {
    
    value.userId = parseInt(value.userId);
    value.companyId = (this.userData.isCompanyFlag == 0 ? parseInt(value.companyId) : this.userData.companyId);
    value.roleId = parseInt(value.roleId);
    value.createdBy = this.userData.userId
    value.isCompanyFlag = this.userData.isCompanyFlag
    if (value.userId == 0) {
      value.op = 1;
    }
    else {
      value.op = 2;
    }
    this.restService.postData('User/CRUDUserData', value)
      .subscribe((result: any) => {
        this._router.navigate(['/component/userprofile'])
      }, error => console.error(error));

  }
}
