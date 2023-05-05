import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import { BehaviorSubject } from 'rxjs';
import { ProdectMasterList } from '../../component/productmaster/productmaster.metadata'
import { BarcodeFormat } from '@zxing/library';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-searchproduct',
  templateUrl: './searchproduct.component.html',
  styleUrls: ['./searchproduct.component.scss']
})


export class SearchproductComponent implements OnInit {
  private spinner: NgxSpinnerService| any;
  showMenu = false;
  keyword = 'productName';
  userData: any;
  mode = 'Search';
  availableDevices: MediaDeviceInfo[] | any;
  public deviceCurrent: MediaDeviceInfo | any;
  deviceSelected: string = '';
  public notifier: NotifierService;
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean = false;
  hasPermission: boolean = false;

  qrResultString: string | any;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  public products: ProdectMasterList[] = [];

  clearResult(): void {
    this.qrResultString = null;
    this.mode = 'Search';
  }
  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {

    this.restService.getAllData('Product/GetProductList?id=0 &companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag + '&qrCode=' + resultString)
      .subscribe((result: any) => {

        if (result.length != 0) {
          localStorage.setItem("QRCode", result[0].qrCode);
          localStorage.setItem('ProductId', result[0].productId.toString());
          this._route.navigate(["/clientcomponent/product"]);
        }
        else {
          this.mode = 'Search';
          this.notifier.notify("error", "No product found!");

        }
        //this.productDetails.selectedRoleId = (result[0].roleId)
      }, error => this.notifier.notify("error", error.title));

  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find((x: any) => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
  setMyBgColor(bgColorVal: any) {
    let styles: any;
    if (bgColorVal != "" && bgColorVal.indexOf("#") > -1
    && bgColorVal.length >= 4 && bgColorVal != "#000" && bgColorVal != "#000000"
    && bgColorVal.length <= 7) {
      styles = {
        'background-color': bgColorVal
      };
    }
    else
    {
      styles = {
        'background-color': "#041f3e",
      };
    }
    return styles;
  }


  onloadProduct() {
    //this.spinner.show();
    this.restService.getAllData('Product/GetProductList?id=0 &companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag + '&qrCode=')
      .subscribe((result: any) => {
        this.products = result;
      }, error => console.log(error));
    //this.spinner.hide();
  }
  selectEvent(item: ProdectMasterList) {

    this.restService.getAllData('Product/GetProductList?id=' + item.productId + '&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag + '&qrCode=' + item.qrCode)
      .subscribe((result: any) => {
        if (result[0].productId != 0) {
          localStorage.setItem("QRCode", result[0].qrCode);
          localStorage.setItem('ProductId', result[0].productId.toString());
          this._route.navigate(["/clientcomponent/product"]);
        }
        else {
          this.notifier.notify("error", "No product found!")

        }
        //this.productDetails.selectedRoleId = (result[0].roleId)
      }, error => this.notifier.notify("error", error.title));

  }

  onChangeSearch(search: string) {
    this.onloadProduct();
  }

  onFocused(e: any) {
    this.onloadProduct();
    // do something
  }
  constructor(public _route: Router,
    private restService: RestService,
    notifier: NotifierService,
    private zone: NgZone,spinner: NgxSpinnerService) {
    this.spinner = spinner;
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.onloadProduct();
    this.showMenu = true;
    this.notifier = notifier;
//     window.angularComponentReference = {
//       zone: this.zone,
//      componentFn: (searchcontent: any) => this.onCodeResult(searchcontent),
//      component: this,
//  };
  }

  ngOnInit(): void {
    localStorage.removeItem('ProductId');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('searchproduct-page');
  }

  ngOnDestroy(): void {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('searchproduct-page');
  }

}
