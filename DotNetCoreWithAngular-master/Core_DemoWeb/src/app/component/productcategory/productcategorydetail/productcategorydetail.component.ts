import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import { ProductcategoryList } from '../productcategory.metadata';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-productcategorydetail',
  templateUrl: './productcategorydetail.component.html',
  styleUrls: ['./productcategorydetail.component.css']
})
export class ProductcategorydetailComponent implements OnInit {
  //// Declare the comman user 
  temp = [];
  modalReference: any;
  public productCatList: ProductcategoryList[] | any;
  public productCat: ProductcategoryList | any;
  private notifier: NotifierService;
  closeResult = '';
  userData: any;
  ColumnMode = ColumnMode;
  mode: any;
  scrollBarHorizontal = (window.innerWidth < 768);
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  private spinner: NgxSpinnerService| any;
  //// constructer

  constructor(private restService: RestService,
    private _router: Router,
    private modalService: NgbModal,
    notifier: NotifierService,spinner: NgxSpinnerService) {
    this.notifier = notifier;
    this.spinner = spinner;
    window.onresize = () => {
      this.scrollBarHorizontal = (window.innerWidth < 768);
    };
  }


  ngOnInit(): void {
    this.InitialObjVal();
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.loadProductCategory();
  }
  InitialObjVal() {
    this.productCat = {
      productCategoryID: 0, productCategotryName: '', companyId: 0, isActive: true,
      isDelete: true, createdBy: 0, updatedBy: 0, op: 0
    }
  }
  open(content: any,recordMode: any, optype: number = 0) {
    if (optype == 0) {
      this.InitialObjVal();
    }
    if(recordMode.toString()=="0")
      this.mode="Edit";
    else
      this.mode="View";

    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
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

  setMyBgColor(bgColorVal: any) {
    let styles = {
      'background-color': bgColorVal
    };
    return styles;
  }

  loadProductCategory() {
    this.spinner.show();
    this.restService.getAllData('ProductCategory/GetProductCategory?id=0&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((res: any) => {
        this.spinner.hide();
        this.productCatList = res;
        this.temp = res;
      }, error => this.notifier.notify("error", error.title))
  }
  deleteRecord(selectedRecord: ProductcategoryList) {
    selectedRecord.op = 3;
    this.restService.postData('ProductCategory/CRUDProductCategory', selectedRecord)
      .subscribe((result: any) => {
        this.loadProductCategory();
      }, error => this.notifier.notify("error", error.title));
  }
  refresh(): void {
    window.location.reload();
  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    var flag = this.userData.isCompanyFlag;
    const temp = this.temp.filter(function (d: any) {
      const isproductCategotryName = d.productCategotryName.toLowerCase().indexOf(val) !== -1 || !val
      const iscompanyName = ((d.companyName.toLowerCase().indexOf(val) !== -1 || !val))

      return isproductCategotryName || iscompanyName
    });

    // update the rows
    this.productCatList = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }



  editViewRow(selectedRecord: ProductcategoryList, content: any,recordMode: any) {
    this.productCat = selectedRecord;
    this.open(content, recordMode, 1);
    //this._router.navigate(['/component/companyforms', selectedRecord.productCategoryID])
  }

  onSubmit(value: any) {
    if (value.productCategotryName == "") {
      this.notifier.notify("error", "Please fill the Product Category Name")
    }
    else {
      if (value.productCategoryID == 0) {
        value.op = 1
      }
      else {
        value.op = 2
      }
      value.productCategoryID = parseInt((value.productCategoryID == '' ? "0" : value.productCategoryID))
      value.isDelete = false;
      value.isActive = true;
      value.companyId = this.userData["companyId"];
      value.createdBy = this.userData["userId"];
      value.updatedBy = this.userData["userId"];
      this.restService.postData('ProductCategory/CRUDProductCategory', value)
        .subscribe((result: any) => {
          this.notifier.notify("success", "Product category added successfully");
          this.modalService.dismissAll();
          this.loadProductCategory();

        }, error => this.notifier.notify("error", error.title));
    }
  }
}
