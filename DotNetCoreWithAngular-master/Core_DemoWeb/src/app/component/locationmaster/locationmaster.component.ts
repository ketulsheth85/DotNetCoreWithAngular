import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NotifierService } from 'angular-notifier';
import { RestService } from 'src/app/rest.service';
import { environment } from 'src/environments/environment';
import { CompanyData } from '../companymaster/companymaster.metadata';
import { Locationmaster } from './locationmaster';

@Component({
  selector: 'app-locationmaster',
  templateUrl: './locationmaster.component.html',
  styleUrls: ['./locationmaster.component.css']
})
export class LocationmasterComponent implements OnInit {

  //// Declare the comman user
  public loactionList: Locationmaster[] = [];
  public companyList: CompanyData[] = [];
  public loactionData: Locationmaster | any;
  private notifier: NotifierService;
  closeResult = '';
  userData: any;
  temp = [];
  ColumnMode = ColumnMode;
  mode = "";
  CompanyInsertLevel: any;
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  scrollBarHorizontal = (window.innerWidth < 768);
  //// constructer

  constructor(private restService: RestService,
    private _router: Router,
    private modalService: NgbModal,
    notifier: NotifierService,) {
    this.notifier = notifier;
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.loadCompanyData();
    this.loadLoactionMaster();
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
    this.loactionData = {
      locationId: 0, locationName: '', locationCode: '', locationAddress: '', city: ''
      , zip: '', country: '', phoneNo: '', companyId: 0, isActive: true,
      isDelete: false, loginUserID: 0, op: 0, isCompanyFlag: 0
    }
    this.CompanyInsertLevel = environment.CompanyInsertLevel;
    this.mode = "Edit";
  }

  open(content: any,recordMode: any) {
    if(recordMode.toString() == "1")
      this.mode="View";
    else
      this.mode="Edit";

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        this.loactionData = {
          locationId: 0, locationName: '', locationCode: '', locationAddress: '', city: ''
          , zip: '', country: '', phoneNo: '', companyId: 0, isActive: true,
          isDelete: false, loginUserID: 0, op: 0, isCompanyFlag: 0
        }
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.loactionData = {
          locationId: 0, locationName: '', locationCode: '', locationAddress: '', city: ''
          , zip: '', country: '', phoneNo: '', companyId: 0, isActive: true,
          isDelete: false, loginUserID: 0, op: 0, isCompanyFlag: 0
        }
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

  loadCompanyData() {
    this.restService.getAllData('Company/GetCompanyList?id='+this.userData.companyId)
      .subscribe((res: any) => {
        this.companyList = res;
      }, error => this.notifier.notify("error", error.title))
  }

  loadLoactionMaster() {
    this.restService.getAllData('LoactionMaster/GetLocationMaster?id=0&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((res: any) => {
        this.loactionList = res;
        this.temp = res;
      }, error => this.notifier.notify("error", error.title))
  }

  deleteRecord(selectedRecord: Locationmaster) {
    selectedRecord.op = 3;
    this.restService.postData('LoactionMaster/CRUDLocationMaster', selectedRecord)
      .subscribe((result: any) => {
        this.loadLoactionMaster();
      }, error => this.notifier.notify("error", error.title));
  }

  onProducCatChange(value: any) {
    this.loactionData.companyId = value.target.value;
  }

  refresh(): void {
    window.location.reload();
  }

  editViewRow(selectedRecord: Locationmaster, content: any, recordMode: any) {
    
    this.loactionData = selectedRecord;
    this.loactionData.companyId = String(selectedRecord.companyId)
    this.loactionData.locationName = String(selectedRecord.locationName)
    this.open(content, recordMode);
    //this._router.navigate(['/component/companyforms', selectedRecord.productCategoryID])
  }

  updateFilter(event: any) {
    
    const val = event.target.value.toLowerCase();
    var flag = this.userData.isCompanyFlag;
    const temp = this.temp.filter(function (d: any) {
      const islocationName = d.locationName.toLowerCase().indexOf(val) !== -1 || !val
      const islocationCode = d.locationCode.toLowerCase().indexOf(val) !== -1 || !val
      const islocationAddress = d.locationAddress.toLowerCase().indexOf(val) !== -1 || !val
      const iscity = d.city.toLowerCase().indexOf(val) !== -1 || !val
      const iszip = d.zip.toLowerCase().indexOf(val) !== -1 || !val
      const iscountry = d.country.toLowerCase().indexOf(val) !== -1 || !val
      const isphoneNo = d.phoneNo.toLowerCase().indexOf(val) !== -1 || !val
      const iscompanyName = ((d.companyName.toLowerCase().indexOf(val) !== -1 || !val))
      return islocationName || islocationCode || islocationAddress
        || iscity || iszip || iscountry || isphoneNo || iscompanyName
    });

    // update the rows
    this.loactionList = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }

  onSubmit(value: any) {
    
    if (value.companyId == "0" || value.locationName == "" || value.locationAddress == ""
      || value.locationCode == "" || value.city == "") {
      this.notifier.notify("error", "Please fill the data")
    }
    else {
      if (value.locationId == 0) {
        value.op = 1
      }
      else {
        value.op = 2
      }
      value.locationId = parseInt(value.locationId);
      value.companyId = parseInt(value.companyId == '' || value.companyId == undefined ? this.userData.companyId : value.companyId);
      value.isDelete = false;
      value.isActive = true;
      //value.companyId = this.userData["companyId"];
      value.loginUserID = this.userData["userId"];
      value.isCompanyFlag = this.userData.isCompanyFlag
      this.restService.postData('LoactionMaster/CRUDLocationMaster', value)
        .subscribe((result: any) => {
          this.notifier.notify("success", "Location saved successfully")
          this.modalService.dismissAll();
          this.loadLoactionMaster();
        }, error => this.notifier.notify("error", error.title));
    }
  }

}
