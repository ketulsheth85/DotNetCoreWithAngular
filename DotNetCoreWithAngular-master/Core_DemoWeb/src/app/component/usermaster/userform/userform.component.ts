import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyData } from '../../companymaster/companymaster.metadata';
import { RestService } from '../../../rest.service';
import { RoleData, UserData } from '../usermaster.metadata';
import { Locationmaster } from '../../locationmaster/locationmaster';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  public userdetail: any;
  public companydetail: CompanyData[] | any;
  public loactionList: Locationmaster[] | any;
  public roledetail: RoleData[] | any;
  private notifier: NotifierService;
  userData: any;
  mode: any;
  recordMode: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router, notifier: NotifierService,
    private restService: RestService) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.userdetail = {
      userId: 0, userName: "", userEmailId: "", selectCompanyId: '', selectLocationId: '', selectedRoleId: '',
      lastName: "", firstName: "", companyId: 0, locationId: 0, employeeId: 0, phoneNo: "", companyName: "",
      mobile: "", userLocation: "", department: "", roleId: 0, isCompanyFlag: 0, loginUserID: 0, op: 0,
      password: ""
    };
    this.companydetail = {
      companyID: 0, companyName: "", companyAdress: "", companyPhone: "", companyFax: "",
      companyZip: "", companyLogo: "", companyLogos: "", companyCode: "", postAddress: "", city: "",
      country: "", colorCode: "", companyEmail: "", op: 0
    };
    this.loactionList = {
      locationId: 0, locationName: "", locationCode: "", locationAddress: "", city: "", zip: "", country: "",
      phoneNo: "", companyId: 0, isActive: 0, isDelete: 0, createdBy: 0, createdDate: "", updatedBy: 0,
      updatedDate: "", companyName: "", op: 0
    };

    const id = this._route.snapshot.params.id;
    this.recordMode = this._route.snapshot.params.recordMode;
    this.mode = "Edit";
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.getCompanydata();
    this.getLocationData();
    this.getRoleData();
    this.getUserDetails(id, this.recordMode);
  }

  private getCompanydata() {
    this.restService.getAllData('Company/GetCompanyList?id=' + this.userData.companyId)
      .subscribe((result: any) => {

        this.companydetail = result
      }, error => console.error());
  }
  private getLocationData() {
    this.restService.getAllData('LoactionMaster/GetLocationMaster?id=0&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=1')
      .subscribe((res: any) => {
        this.loactionList = res;
      }, error => console.error(error));
  }
  setMyBgColor(bgColorVal: any) {
    let styles = {
      'background-color': bgColorVal
    };
    return styles;
  }
  private getUserDetails(id: number, recordMode: any) {
    if (id === 0) {
      this.userdetail;
    }
    else {
      this.restService.getAllData('User/GetUserList?id=' + id + '&companyId=' + this.userData.companyId
        + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
        .subscribe((result: any) => {
          if (recordMode.toString() == "0")
            this.mode = "Edit";
          else
            this.mode = "View";

          this.userdetail = Object.assign({}, result[0]);
          this.userdetail.selectCompanyId = String(result[0].companyId)
          this.restService.getAllData('LoactionMaster/GetLocationMaster?id=0&companyId=' + this.userdetail.selectCompanyId
            + '&IsCompanyFlag=1').subscribe((res: any) => {
              //this.loactionList = res;
              this.userdetail.selectLocationId = String(result[0].locationId)
            }, error => console.error(error));
          //this.userdetail.selectLocationId = String(result[0].locationId)
          this.userdetail.selectedRoleId = String(result[0].roleId)
        }, error => console.error(error));
    }
  }

  getRoleData() {

    this.restService.getAllData('Company/GetRoleList').subscribe((result: any) => {
      var list: any = [];
      debugger
      result.forEach((re: any) => {
        if (this.userData.companyLevel == 0 && re.roleName != 'Emp')
          list.push({ "roleId": re.roleId, 'roleName': re.roleName });
        else if (this.userData.companyLevel != 0) {
          list.push({ "roleId": re.roleId, 'roleName': re.roleName });
        }
      });
      this.roledetail = list
    }, error => console.error());
  }

  onCompanyChange(value: any) {
    this.userdetail.companyId = value.target.value;
    this.restService.getAllData('LoactionMaster/GetLocationMaster?id=0&companyId=' + this.userdetail.companyId
      + '&IsCompanyFlag=1')
      .subscribe((res: any) => {
        this.loactionList = res;
      }, error => console.error(error));
  }

  onLocationChange(value: any) {
    this.userdetail.locationId = value.target.value;
  }

  onRoleChange(value: any) {
    this.userdetail.roleId = value.target.value;
  }

  onSubmit(value: any) {
    value.userId = parseInt(value.userId);
    value.companyId = parseInt(value.companyId == '' || value.companyId == undefined ? this.userData.companyId : value.companyId);
    value.roleId = parseInt(value.roleId);
    value.locationId = parseInt(value.locationId);
    value.loginUserID = this.userData.userId;
    value.isCompanyFlag = this.userData.isCompanyFlag
    if (value.userId == 0) {
      value.op = 1;
    }
    else {
      value.op = 2;
    }
    this.restService.postData('User/CRUDUserData', value)
      .subscribe((result: any) => {
        if (result != null) {
          if(result.dataStatus == "Already")
          this.notifier.notify("error", "Already user name or email is used")
        }
        else {
          this._router.navigate(['/component/usermaster'])
        }
      }, error => console.error(error));

  }
}
