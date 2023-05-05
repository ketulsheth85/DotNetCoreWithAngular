import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../usermaster.metadata'
import { RestService } from '../../../rest.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  public forecasts: UserData[] | undefined;
  userData: any;
  temp = [];
  ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  scrollBarHorizontal = (window.innerWidth < 768);
  private spinner: NgxSpinnerService | any;
  constructor(private http: HttpClient, private _router: Router,
    private restService: RestService,spinner: NgxSpinnerService) {
    var user = localStorage.getItem('userSession');
    this.spinner = spinner;
    this.userData = JSON.parse((user != null ? user : ''));
    this.onLoadData();
    window.onresize = () => {
      this.scrollBarHorizontal = (window.innerWidth < 768);
    };
  }
  ngOnInit(): void {
  }
  setMyBgColor(bgColorVal: any) {
    let styles = {
      'background-color': bgColorVal
    };
    return styles;
  }
  deleteRecord(selectedRecord: UserData) {

    selectedRecord.op = 3;
    this.restService.postData('User/CRUDUserData', selectedRecord)
      .subscribe((result: any) => {
        this.refresh();
      }, error => console.error(error));
  }
  editViewRow(selectedRecord: UserData,recordMode: any) {
    this._router.navigate(['/component/userforms', selectedRecord.userId, recordMode])
  }
  refresh(): void {
    window.location.reload();
  }
  onLoadData() {
    this.spinner.show();
    this.restService.getAllData('User/GetUserList?id=0&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((result: any) => {
        this.spinner.hide();
        this.forecasts = result;
        this.temp = result;
      }, error => console.error(error));
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    var flag = this.userData.isCompanyFlag;
    const temp = this.temp.filter(function (d: any) {
      const isfullName = d.fullName.toLowerCase().indexOf(val) !== -1 || !val
      const isuserEmailId = d.userEmailId.toLowerCase().indexOf(val) !== -1 || !val
      const isdepartment = d.department.toLowerCase().indexOf(val) !== -1 || !val
      const isroleName = d.roleName.toLowerCase().indexOf(val) !== -1 || !val
      const iscompanyName = ((d.companyName.toLowerCase().indexOf(val) !== -1 || !val))
      return isfullName || isuserEmailId || isdepartment || isroleName || iscompanyName
    });

    // update the rows
    this.forecasts = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }


}
