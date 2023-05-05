import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgModule, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyData } from '../companymaster.metadata';
import { RestService } from '../../../rest.service';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { environment } from '../../../../../src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-companydetail',
  templateUrl: './companydetail.component.html',
  styleUrls: ['./companydetail.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class CompanydetailComponent implements OnInit {
  temp = [];
  public forecasts: CompanyData[] | any;
  userData: any;
  ColumnMode = ColumnMode;
  CompanyInsertLevel: any;
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  private spinner: NgxSpinnerService| any;
  scrollBarHorizontal = (window.innerWidth < 768);
  constructor(private _router: Router,
    private companyService: RestService,
    spinner: NgxSpinnerService
  ) {
    this.spinner = spinner;
    window.onresize = () => {
      this.scrollBarHorizontal = (window.innerWidth < 768);
    };
  }
  setMyBgColor(bgColorVal: any) {
    let styles = {
      'background-color': bgColorVal
    };
    return styles;
  }

  deleteRecord(selectedRecord: CompanyData) {
    selectedRecord.op = 3;
    this.companyService.postData('Company/CRUDComanyData', selectedRecord)
      .subscribe((result: any) => {
        this.refresh();
      }, error => alert(error));
  }
  refresh(): void {
    window.location.reload();
  }
  editViewRow(selectedRecord: CompanyData, recordMode: any) {
    this._router.navigate(['/component/customerforms', selectedRecord.companyID, recordMode])
  }
  onLoadData() {

    this.companyService.getAllData('Company/GetCompanyList?id=' + this.userData.companyId)
      .subscribe((result: any) => {
        this.forecasts = result;
        this.temp = result;
      })
  }
  updateFilter(event: any) {

    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d: any) {
      const iscompanyName = d.companyName.toLowerCase().indexOf(val) !== -1 || !val
      const iscompanyAdress = d.companyAdress.toLowerCase().indexOf(val) !== -1 || !val
      const iscompanyPhone = d.companyPhone.toLowerCase().indexOf(val) !== -1 || !val
      const iscompanyEmail = d.companyEmail.toLowerCase().indexOf(val) !== -1 || !val
      return iscompanyName || iscompanyAdress || iscompanyPhone || iscompanyEmail
    });

    // update the rows
    this.forecasts = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }
  ngOnInit(): void {
    this.spinner.show();
    this.CompanyInsertLevel = environment.CompanyInsertLevel;
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.onLoadData();
    //setTimeout(() => {
      /** spinner ends after 1 seconds */

      this.spinner.hide();
    //}, 1000);
  }

}


