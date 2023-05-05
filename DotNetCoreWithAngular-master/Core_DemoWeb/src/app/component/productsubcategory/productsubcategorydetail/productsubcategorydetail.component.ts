import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NotifierService } from 'angular-notifier';
import { RestService } from 'src/app/rest.service';
import { ProductcategoryList } from '../../productcategory/productcategory.metadata';
import { ProdctSubCategoryData } from '../productsubcategory.metadata';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-productsubcategorydetail',
  templateUrl: './productsubcategorydetail.component.html',
  styleUrls: ['./productsubcategorydetail.component.css']
})
export class ProductsubcategorydetailComponent implements OnInit {

  //// Declare the comman user 
  public productSubCatList: ProdctSubCategoryData[] | any;
  public productCatList: ProductcategoryList[] | any;
  public productSubCat: ProdctSubCategoryData | any;
  private notifier: NotifierService;
  closeResult = '';
  userData: any;
  temp = [];
  ColumnMode = ColumnMode;
  mode: any;
  scrollBarHorizontal = (window.innerWidth < 768);
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  private spinner: NgxSpinnerService| any;
  //// constructer

  constructor(private restService: RestService,
    spinner: NgxSpinnerService,
    private _router: Router,
    private modalService: NgbModal,
    notifier: NotifierService,) {
    this.notifier = notifier;
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

  ngOnInit(): void {
    this.InitialObjVal();
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.loadProductCategory();
    this.loadProductSubCategory();
  }
  InitialObjVal(): void{
    this.productSubCat = {
      productSubCategoryId: 0, prodcuctCategoryId: 0
      , selectedID: '', name: '', companyId: 0, isActive: true,
      isDelete: true, createdBy: 0, updatedBy: 0, op: 0,isCompanyFlag:0
    }
  }
  open(content: any,recordMode: any, optype: number = 0) {

    if (optype == 0) {
      this.InitialObjVal();
    }

    if (recordMode.toString()=="0")
      this.mode = "Edit";
    else
      this.mode = "View";

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  loadProductSubCategory() {
    this.spinner.show();
    this.restService.getAllData('ProductSubCategory/GetProductSubCategory?id=0&companyId=' + this.userData.companyId
    + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((res: any) => {
        this.spinner.hide();
        this.productSubCatList = res;
        this.temp = res;
      }, error => this.notifier.notify("error", error.title))
  }

  loadProductCategory() {
    this.restService.getAllData('ProductCategory/GetProductCategory?id=0&companyId=' + this.userData.companyId
    + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((res: any) => {
        
        this.productCatList = res;
      }, error => this.notifier.notify("error", error.title))
  }

  deleteRecord(selectedRecord: ProdctSubCategoryData) {
    selectedRecord.op = 3;
    this.restService.postData('ProductSubCategory/CRUDProductSubCategory', selectedRecord)
      .subscribe((result: any) => {
        this.loadProductSubCategory();
      }, error => this.notifier.notify("error", error.title));
  }

  onProducCatChange(value: any) {
    this.productSubCat.prodcuctCategoryId = value.target.value;
  }

  refresh(): void {
    window.location.reload();
  }

  editViewRow(selectedRecord: ProdctSubCategoryData, content: any,recordMode: any) {
    
    this.productSubCat = selectedRecord;
    this.productSubCat.selectedID = String(selectedRecord.prodcuctCategoryId)
    this.open(content,recordMode,1);
    //this._router.navigate(['/component/companyforms', selectedRecord.productCategoryID])
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    var flag = this.userData.isCompanyFlag;
    const temp = this.temp.filter(function (d: any) {
      const isproductCategotryName = d.productCategotryName.toLowerCase().indexOf(val) !== -1 || !val
      const isname = d.name.toLowerCase().indexOf(val) !== -1 || !val
      const iscompanyName = ((d.companyName.toLowerCase().indexOf(val) !== -1 || !val))
      return isproductCategotryName || isname|| iscompanyName
    });

    // update the rows
    this.productSubCatList = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }

  onSubmit(value: any) {
    if (value.prodcuctCategoryId == "" && value.name == "") {
      this.notifier.notify("error", "Please fill the data")
    }
    else {
      if (value.productSubCategoryId == 0) {
        value.op = 1
      }
      else {
        value.op = 2
      }
      value.productSubCategoryId = parseInt((value.productSubCategoryId == '' ? "0" : value.productSubCategoryId))
      value.productCategoryID = parseInt((value.prodcuctCategoryId == '' ? "0" : value.prodcuctCategoryId))
      value.isDelete = false;
      value.isActive = true;
      value.companyId = this.userData["companyId"];
      value.createdBy = this.userData["userId"];
      value.updatedBy = this.userData["userId"];
      value.isCompanyFlag = this.userData.isCompanyFlag
      this.restService.postData('ProductSubCategory/CRUDProductSubCategory', value)
        .subscribe((result: any) => {
          if(value.op == 1)
          {
            this.notifier.notify("success", "Product sub category added successfully")
          }
          else
          {
            this.notifier.notify("success", "Product sub category updated successfully")
          }
          this.modalService.dismissAll();
          this.loadProductSubCategory();
        }, error => this.notifier.notify("error", error.title));
    }
  }
}
