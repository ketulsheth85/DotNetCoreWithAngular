import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import { DocumentcategoryList } from '../documentcategory.metadata';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-documentcategorydetail',
  templateUrl: './documentcategorydetail.component.html',
  styleUrls: ['./documentcategorydetail.component.css']
})
export class DocumentcategorydetailComponent implements OnInit {
  //// Declare the comman user
  temp = [];
  public documentCatList: DocumentcategoryList[] | any;
  public documentCat: DocumentcategoryList | any;
  private notifier: NotifierService;
  closeResult = '';
  userData: any;
  ColumnMode = ColumnMode;
  mode: any;
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  private spinner: NgxSpinnerService| any;
  scrollBarHorizontal = (window.innerWidth < 768);
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

  InitialObjVal()
  {
    this.documentCat = {
      documentCatId: 0, documentCatName: '', companyId: 0, isActive: true,
      isDelete: true, createdBy: 0,updatedBy:0, op: 0
    }
  }
  open(content: any,recordMode: any,optype : number = 0) {

    if(recordMode.toString() == "0"){
      this.mode = "Edit";
    }
    else{
      this.mode = "View";
    }

    if(optype == 0)
    {
      this.InitialObjVal();
    }
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

  setMyBgColor(bgColorVal: any) {
    let styles = {
      'background-color': bgColorVal
    };
    return styles;
  }

  loadProductCategory() {
    this.spinner.show();
    this.restService.getAllData('DocumentCategory/GetDocumentCategory?id=0&companyId='+this.userData.companyId
    +'&isCompanyFlag='+this.userData.isCompanyFlag)
      .subscribe((res: any) => {
        this.spinner.hide();
        this.documentCatList = res;
        this.temp = res;
      }, error => this.notifier.notify("error", error.title))
  }
  deleteRecord(selectedRecord: DocumentcategoryList) {
    selectedRecord.op = 3;
    this.restService.postData('DocumentCategory/CRUDDocumentCategory', selectedRecord)
      .subscribe((result: any) => {
        this.loadProductCategory();
      }, error => this.notifier.notify("error", error.title));
  }
  refresh(): void {
    window.location.reload();
  }
  editViewRow(selectedRecord: DocumentcategoryList,content:any,recordMode: any) {
    this.documentCat = selectedRecord;
    this.open(content,recordMode,1);
    //this._router.navigate(['/component/companyforms', selectedRecord.productCategoryID])
  }

  updateFilter(event: any) {

    const val = event.target.value.toLowerCase();
    var lt = this.userData.isCompanyFlag;
    const temp = this.temp.filter(function (d: any) {
      const isdocumentCatName = d.documentCatName.toLowerCase().indexOf(val) !== -1 || !val
      const iscompanyName = ((d.companyName.toLowerCase().indexOf(val) !== -1 || !val))
      return isdocumentCatName || iscompanyName
    });

    // update the rows
    this.documentCatList = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }

  onSubmit(value: any) {
   if (value.documentCatName == "") {
      this.notifier.notify("error", "Please fill the Document Category Name")
    }
    else {
      if (value.documentCatId == 0) {
        value.op = 1
      }
      else {
        value.op = 2
      }
      value.documentCatId = parseInt((value.documentCatId == '' ? "0" : value.documentCatId))
      value.isDelete = false;
      value.isActive = true;
      value.companyId = this.userData["companyId"];
      value.createdBy = this.userData["userId"];
      value.updatedBy = this.userData["userId"];
      this.restService.postData('DocumentCategory/CRUDDocumentCategory', value)
        .subscribe((result: any) => {
          if(value.op == 1)
          {
          this.notifier.notify("success", "Document category added successfully")
          }
          else
          {
            this.notifier.notify("success", "Document category updated successfully")
          }
          this.loadProductCategory();
         this.modalService.dismissAll();
      }, error => this.notifier.notify("error", error.title));
    }
  }
}
