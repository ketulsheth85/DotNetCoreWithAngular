import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { RestService } from 'src/app/rest.service';
import { ProdectMasterList } from '../../productmaster/productmaster.metadata';
import { ProductVideoData } from '../productvideo.metadata';
import * as $ from 'jquery';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-productvideodetail',
  templateUrl: './productvideodetail.component.html',
  styleUrls: ['./productvideodetail.component.css']
})
export class ProductvideodetailComponent implements OnInit {

  //// Declare the common user
  public lstproductvideo: ProductVideoData[] | any;
  public productList: ProdectMasterList[] | any;
  productvideo: ProductVideoData | any;
  private notifier: NotifierService;
  closeResult = '';
  userData: any;
  mode: any;
  private videofilename: string | any;
  temp = [];
  ColumnMode = ColumnMode;
  videoUrl: any;
  Url: any;
  add: any;
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  private spinner: NgxSpinnerService| any;
  scrollBarHorizontal = (window.innerWidth < 768);
  //// constructer

  constructor(private restService: RestService,
    private _router: Router,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    notifier: NotifierService,spinner: NgxSpinnerService) {
    this.notifier = notifier;
    this.spinner = spinner;
    window.onresize = () => {
      this.scrollBarHorizontal = (window.innerWidth < 768);
    };
  }


  ngOnInit(): void {
    this.InitialObjVal();
    this.videofilename = "";
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.Url = environment.imageUrl;
    this.add = 0;
    this.loadProductData();
    this.loadVideoList();
  }

  InitialObjVal() {
    this.productvideo = {
      videoId: 0, productId: 0, videoName: '', videoType: '', videoUrl: ''
      , selectedID: '', companyId: 0, isActive: true, youtubevurl: '', videoTypeval: '',
      isDelete: true, createdBy: 0, updatedBy: 0, op: 0
    }
    this.videofilename = "";
  }
  setMyBgColor(bgColorVal: any) {
    let styles = {
      'background-color': bgColorVal
    };
    return styles;
  }
  open(content: any,recordMode: any, optype: number = 0) {
    if(recordMode.toString() == "0")
    {
      this.mode = "Edit";
      this.add = 0;
    }
    else{
      this.mode = "View";
    }
    if (optype == 0) {
      this.InitialObjVal();
      this.add = 1;
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

  loadProductData() {
    this.restService.getAllData('Product/GetProductList?id=0&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((res: any) => {
        this.productList = res;
      }, error => this.notifier.notify("error", error.title))
  }

  loadVideoList() {
    this.spinner.show();
    this.restService.getAllData('ProductVideo/GetProductVideos?id=0&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((res: any) => {
        this.spinner.hide();
        this.lstproductvideo = res;
        this.temp = res;
      }, error => this.notifier.notify("error", error.title))
  }

  deleteRecord(selectedRecord: ProductVideoData) {
    selectedRecord.op = 3;
    this.restService.postData('ProductVideo/CRUDProductVideo', selectedRecord)
      .subscribe((result: any) => {
        this.loadVideoList();
      }, error => this.notifier.notify("error", error.title));
  }
  onProductChange(value: any) {
    this.productvideo.productId = value.target.value;
  }
  onVideoTypeChange(value: any) {
    this.productvideo.videoTypeval = value.target.value;
    this.vediotypechange(this.productvideo.videoTypeval);
    this.add = 1;
  }
  vediotypechange(value: any) {
    if (value == 'YouTube') {

      $(".clsvideopath").show();
      $(".clsyoutubeurl").show();
      $(".clsotherurl").hide();
    }
    else if (value == 'Other') {
      $(".clsvideopath").show();
      $(".clsyoutubeurl").hide();
      $(".clsotherurl").show();
    }
    else {
      $(".clsvideopath").hide();
    }
  }
  loadVideo(value: any){
    this.productvideo.videoType = this.productvideo.videoTypeval;
    this.productvideo.videoUrl = value.target.value;
    this.add = 0;
  }
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    var flag = this.userData.isCompanyFlag;
    const temp = this.temp.filter(function (d: any) {
      const isproductName = d.productName.toLowerCase().indexOf(val) !== -1 || !val
      const isvideoName = d.videoName.toLowerCase().indexOf(val) !== -1 || !val
      const isvideoType = d.videoType.toLowerCase().indexOf(val) !== -1 || !val
      const iscompanyName = ((d.companyName.toLowerCase().indexOf(val) !== -1 || !val))
      return isproductName || isvideoName || isvideoType || iscompanyName
    });

    // update the rows
    this.lstproductvideo = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }

  public uploadFile = (files: any) => {
    debugger
    this.add = 0;
    if (files.target.files && files.target.files[0]) {
      var reader = new FileReader();
      this.videofilename = files.target.files[0].name;
      this.productvideo.videoType = this.productvideo.videoTypeval;
      //this.productvideo.videoUrl = files.target.value;
      $('#inputGroupFile01').next('.custom-file-label').html(this.videofilename);
      //reader.readAsDataURL(files.target.files[0]);
      reader.onload = (e: any) => {

        //$('#ifrmaUrl').attr('src', e.target.result);
        this.productvideo.videoUrl = (<FileReader>e.target).result
        //$('#videoUrl').val(e.target.result);
      };
      reader.readAsDataURL(files.target.files[0]);
    }
    else {
      this.videofilename = "";
    }

  }
  refresh(): void {
    window.location.reload();
  }
  editViewRow(selectedRecord: ProductVideoData, content: any,recordMode: any) {
    this.productvideo = selectedRecord;
    this.productvideo.selectedID = String(selectedRecord.productId)
    if (selectedRecord.videoType == 'YouTube') {
      // this.productvideo.youtubevurl = String(selectedRecord.videoUrl)
      //this.productvideo.videoUrl  = this.sanitizer.bypassSecurityTrustResourceUrl(selectedRecord.videoUrl);
      this.productvideo.videoUrl  = selectedRecord.videoUrl;
    }
    else {
      this.productvideo.youtubevurl = ""
      if(selectedRecord.videoUrl.includes(this.Url) == true)
      {
        selectedRecord.videoUrl = selectedRecord.videoUrl.replace(this.Url,'');
      }
      this.productvideo.videoUrl = this.Url + selectedRecord.videoUrl;
    }
    this.open(content,recordMode, 1);

    this.vediotypechange(selectedRecord.videoType);
    $(".clsVideo").show();
    //this._router.navigate(['/component/companyforms', selectedRecord.productCategoryID])
  }
  onSubmit(value: any) {
    debugger
    value.videoType = this.productvideo.videoTypeval;
    if (value.videoType == 'YouTube') {
      value.videoUrl = $('.clstxtvurl').val();
    }
    else {
      value.videoUrl = $('#videoUrl').val();
    }
    if (value.productId == "0" && value.videoName == "" && value.videoUrl == "") {
      this.notifier.notify("error", "Please fill the data")
    }
    else {
      if (value.videoId == 0) {
        value.op = 1
      }
      else {
        value.op = 2
      }

      value.videoId = parseInt((value.videoId == '' ? "0" : value.videoId))
      value.productId = parseInt((value.productId == '' ? "0" : value.productId))
      value.VideoFileName = this.videofilename;
      value.isDelete = false;
      value.isDelete = false;
      value.isActive = true;
      value.companyId = this.userData["companyId"];
      value.createdBy = this.userData["userId"];
      value.updatedBy = this.userData["userId"];
      this.restService.postData('ProductVideo/CRUDProductVideo', value)
        .subscribe((result: any) => {
          if(value.op == 1)
          {
            this.notifier.notify("success", "Product video added successfully")
          }
          else
          {
            this.notifier.notify("info", "Product video updated successfully")
          }
          this.modalService.dismissAll();
          this.loadVideoList();

        }, error => this.notifier.notify("error", error.title));
    }
  }

}
