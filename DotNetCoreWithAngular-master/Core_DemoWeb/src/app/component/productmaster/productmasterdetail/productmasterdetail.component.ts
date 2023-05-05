import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { RestService } from 'src/app/rest.service';
import { environment } from 'src/environments/environment';
import { ProdectMasterList } from '../productmaster.metadata';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-productmasterdetail',
  templateUrl: './productmasterdetail.component.html',
  styleUrls: ['./productmasterdetail.component.css']
})
export class ProductmasterdetailComponent implements OnInit {
  public productList: ProdectMasterList[] | any;
  userData: any;
  temp = [];
  ColumnMode = ColumnMode;
  url='';
  scrollBarHorizontal = (window.innerWidth < 768);
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  private spinner: NgxSpinnerService| any;
  constructor(private _router: Router,
    private restService: RestService,spinner: NgxSpinnerService) {
    this.spinner = spinner;
    window.onresize = () => {
      this.scrollBarHorizontal = (window.innerWidth < 768);
    };
  }
  ngOnInit(): void {
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.onLoadData();
    this.url = environment.imageUrl;
  }
  setMyBgColor(bgColorVal: any) {
    let styles = {
      'background-color': bgColorVal
    };
    return styles;
  }
  deleteRecord(selectedRecord: ProdectMasterList) {

    selectedRecord.op = 3;
    selectedRecord.productImage = "";
    this.restService.postData('Product/CRUDProductData', selectedRecord)
      .subscribe((result: any) => {
        this.refresh();
      }, error => console.error(error));
  }
  editViewRow(selectedRecord: ProdectMasterList,recordMode: any) {
    this._router.navigate(['/component/productmasterform', selectedRecord.productId, recordMode])
  }
  refresh(): void {
    window.location.reload();
  }
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    var flag = this.userData.isCompanyFlag;
    const temp = this.temp.filter(function (d: any) {
      const isproductCategotryName = d.productName.toLowerCase().indexOf(val) !== -1 || !val
      const isqrCode = d.qrCode.toLowerCase().indexOf(val) !== -1 || !val
      const isserialNo = d.serialNo.toLowerCase().indexOf(val) !== -1 || !val
      const isproductionNo = d.productionNo.toLowerCase().indexOf(val) !== -1 || !val
      const isproductionDate = d.productionDate.toLowerCase().indexOf(val) !== -1 || !val
      return isproductCategotryName || isqrCode|| isserialNo|| isproductionNo|| isproductionDate
    });

    // update the rows
    this.productList = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }
  onLoadData() {
    this.spinner.show();
    this.restService.getAllData('Product/GetProductList?id=0&companyId=' + this.userData.companyId
    + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((result: any) => {
        this.spinner.hide();
        this.productList = result;
        this.temp = result;
        for (let i = 0; i < result.length; i++) {
          this.productList[i].productImage = this.url + result[i].productImage;
        }

      }, error => console.error(error));
  }
}
