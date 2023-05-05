import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { RestService } from 'src/app/rest.service';
import { ProdectMasterList } from '../../productmaster/productmaster.metadata';
import { DocumentcategoryList } from '../../documentcategory/documentcategory.metadata';
import { ProductDocumentData } from '../productdocument.metadata';
import * as $ from 'jquery';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-productdocumentdetail',
  templateUrl: './productdocumentdetail.component.html',
  styleUrls: ['./productdocumentdetail.component.css']
})
export class ProductdocumentdetailComponent implements OnInit {

  //// Declare the comman user
  temp = [];
  public lstproductdoc: ProductDocumentData[] | any;
  public productList: ProdectMasterList[] | any;
  public DocCatList: DocumentcategoryList[] | any;
  public productdoc: ProductDocumentData | any;
  private notifier: NotifierService;
  private spinner: NgxSpinnerService| any;
  closeResult = '';
  userData: any;
  mode: any;
  Url: any; showDoc: any; DocUrl: any;
  private docfilename: string | any;
  ColumnMode = ColumnMode;
  scrollBarHorizontal = (window.innerWidth < 768);
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
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
    this.docfilename = "";
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.Url = environment.imageUrl;
    this.showDoc = 0;
    this.loadProductData();
    this.loadDocCategoryData();
    this.loadDocumentList();

    $(document).ready(function () {
      $('#inputGroupFile01').on('change', function () {
        //get the file name
        var fileName = String($(this).val());
        //replace the "Choose a file" label
        $(this).next('.custom-file-label').html(fileName);
      });
    });
  }
  InitialObjVal() {
    this.productdoc = {
      documentId: 0, productId: 0, docName: '', documentCatId: 0, docPath: ''
      , selectedID: '', docCatselectedID: '', companyId: 0, isActive: true,
      isDelete: true, createdBy: 0, updatedBy: 0, op: 0
    }
    this.docfilename = "";
  }
  setMyBgColor(bgColorVal: any) {
    let styles = {
      'background-color': bgColorVal
    };
    return styles;
  }
  open(content: any, recordMode: any, optype: number = 0) {

    if (recordMode.toString() == "0") {
      this.mode = "Edit";
    }
    else {
      this.mode = "View";
    }

    if (optype == 0) {
      this.InitialObjVal();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        this.showDoc = 0;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.showDoc = 0;
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

  loadProductData() {
    this.restService.getAllData('Product/GetProductList?id=0&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((res: any) => {
        this.productList = res;
      }, error => this.notifier.notify("error", error.title))
  }

  loadDocCategoryData() {
    this.restService.getAllData('DocumentCategory/GetDocumentCategory?id=0&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((res: any) => {
        this.DocCatList = res;
      }, error => this.notifier.notify("error", error.title))
  }

  loadDocumentList() {
    this.spinner.show();
    this.restService.getAllData('ProductDocument/GetProductDocuments?id=0&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((res: any) => {
        this.spinner.hide();
        console.log(res);
        this.lstproductdoc = res;
        this.temp = res;
      }, error => this.notifier.notify("error", error.title))
  }

  deleteRecord(selectedRecord: ProductDocumentData) {
    selectedRecord.op = 3;
    this.restService.postData('ProductDocument/CRUDProductDocument', selectedRecord)
      .subscribe((result: any) => {
        this.loadDocumentList();
      }, error => this.notifier.notify("error", error.title));
  }
  onProductChange(value: any) {
    this.productdoc.productId = value.target.value;
  }
  onDocCategoryChange(value: any) {
    this.productdoc.documentCatId = value.target.value;
  }

  public uploadFile = (files: any) => {
    this.showDoc = 1;
    if (files.target.files && files.target.files[0]) {
      ;
      var reader = new FileReader();
      this.docfilename = files.target.files[0].name;
      //alert(files.target.files[0].val());
      $('#inputGroupFile01').next('.custom-file-label').html(this.docfilename);
      reader.onload = function (e: any) {

        // $('#ProPic').attr('src', e.target.result);
        $('#docPath').val(e.target.result);

      };
      reader.readAsDataURL(files.target.files[0]);
    }
    else {
      this.docfilename = "";
    }

  }
  refresh(): void {
    window.location.reload();
  }
  editViewRow(selectedRecord: ProductDocumentData, content: any, recordMode: any) {
    this.showDoc = 1;
    this.productdoc = selectedRecord;
    this.productdoc.selectedID = String(selectedRecord.productId)
    this.productdoc.docCatselectedID = String(selectedRecord.documentCatId)
    this.open(content, recordMode, 1);
    //this._router.navigate(['/component/companyforms', selectedRecord.productCategoryID])
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    var flag = this.userData.isCompanyFlag;
    const temp = this.temp.filter(function (d: any) {
      const isproductCategotryName = d.productName.toLowerCase().indexOf(val) !== -1 || !val
      const isdocName = d.docName.toLowerCase().indexOf(val) !== -1 || !val
      const isdocumentCatName = d.documentCategory.toLowerCase().indexOf(val) !== -1 || !val
      const iscompanyName = ((d.companyName.toLowerCase().indexOf(val) !== -1 || !val))

      return isproductCategotryName || isdocName || isdocumentCatName || iscompanyName
    });

    // update the rows
    this.lstproductdoc = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }


  onSubmit(value: any) {
    ;
    if (value.documentId == "0" && value.docName == "" && value.docPath == "") {
      this.notifier.notify("error", "Please fill the data")
    }
    else {
      if (value.documentId == 0) {
        value.op = 1
      }
      else {
        value.op = 2
      }

      value.documentId = parseInt((value.documentId == '' ? "0" : value.documentId))
      value.productId = parseInt((value.productId == '' ? "0" : value.productId))
      value.documentCatId = parseInt((value.documentCatId == '' ? "0" : value.documentCatId))
      value.docFileName = this.docfilename;
      value.docPath = String($('#docPath').val());
      value.isDelete = false;
      value.isDelete = false;
      value.isActive = true;
      value.companyId = this.userData["companyId"];
      value.createdBy = this.userData["userId"];
      value.updatedBy = this.userData["userId"];
      this.restService.postData('ProductDocument/CRUDProductDocument', value)
        .subscribe((result: any) => {
          if (value.op == 1) {
            this.notifier.notify("success", "Product document added successfully")
          }
          else {
            this.notifier.notify("success", "Product document updated successfully")
          }
          this.loadDocumentList();
          this.modalService.dismissAll();
        }, error => this.notifier.notify("error", error.title));
    }
  }
}
