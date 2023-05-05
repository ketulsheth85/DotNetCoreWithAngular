import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
// import { ProdectMasterListRelation, ProductRelation } from 'src/app/component/productmaster/productmaster.metadata';
import { ProdectMasterListRelation, ProductRelation } from '../../app-common.metadata';
import { RestService } from 'src/app/rest.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  userData: any;
  showMenu = false;
  url = '';
  public productDetails: any;
  public notifier: NotifierService;
  selectedItems: ProductRelation[] | any;
  Items: ProdectMasterListRelation[] | any;
  private spinner: NgxSpinnerService| any;
  IsAdditionalInfo = false;
  attributeCnt : any;
  strkey = '';
  strValue = '';

  constructor(public _route: ActivatedRoute,
    public _router: Router,
    public restService: RestService,
    notifier: NotifierService,spinner: NgxSpinnerService) {
    this.spinner = spinner;
    this.notifier = notifier;
    this.spinner.show();
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    const qrCode = (localStorage.getItem("QRCode") != null ? localStorage.getItem("QRCode")?.toString() : '');
    var id = Number(localStorage.getItem("ProductId"));
    this.getUserDetails(id, qrCode);
    this.showMenu = true;
    this.url = environment.imageUrl;
    this.spinner.hide();
  }

  ngOnInit(): void {


  }

  private getUserDetails(id: number = 0, qrCode: string = '') {
    this.spinner.show();
    debugger
    if ((id === 0 || id === undefined) && (qrCode === '' || qrCode === undefined)) {
      this.productDetails;
    }
    else {
      this.restService.getAllData('Product/GetProductList?id=' + id + '&companyId=' + this.userData.companyId
        + '&IsCompanyFlag=' + this.userData.isCompanyFlag + '&qrCode=' + qrCode)
        .subscribe((result: any) => {

          localStorage.setItem("ProductId", result[0].productId);
          this.productDetails = Object.assign({}, result[0]);
          debugger
          if(this.productDetails.attributeKey1 != '' || this.productDetails.attributeKey2 != '' || this.productDetails.attributeKey3 != '' ||
          this.productDetails.attributeKey4 != '' ||this.productDetails.attributeKey5 != '' ||this.productDetails.attributeKey6 != '' ||
          this.productDetails.attributeKey7 != '' ||this.productDetails.attributeKey8 != '' ||this.productDetails.attributeKey9 != '' ||this.productDetails.attributeKey10 != '' ||
          this.productDetails.attributeValue1 != '' || this.productDetails.attributeValue2 != '' || this.productDetails.attributeValue3 != '' ||
          this.productDetails.attributeValue4 != '' ||this.productDetails.attributeValue5 != '' ||this.productDetails.attributeValue6 != '' ||
          this.productDetails.attributeValue7 != '' ||this.productDetails.attributeValue8 != '' ||this.productDetails.attributeValue9 != '' ||this.productDetails.attributeValue10 != '' 
          ){
            this.IsAdditionalInfo = true;
          }
          else{
            this.IsAdditionalInfo = false;
          }

          this.productDetails.productSubCat = result[0].productSubCat.split(',');

          this.productDetails.productImage = (result[0].productImage != '' ? this.url + result[0].productImage : '../../../assets/images/background/No-Image.png');

          this.selectedItems = result[0].objrelSubcat;
          this.Items = result[0].objrelProduct;
          for (let i = 0; i < result[0].objrelProduct.length; i++) {
            this.Items[i].productImage = (result[0].objrelProduct[i].productImage != '' ? this.url + result[0].objrelProduct[i].productImage : '../../../assets/images/background/No-Image.png');
          }

        }, error => this.notifier.notify("error", error.title));
    }
    
  }

  loadNewProduct(item: any) {

    localStorage.removeItem('ProductId');
    localStorage.removeItem('QRCode');
    localStorage.setItem('ProductId', item);
    localStorage.setItem('QRCode', '');
    window.location.reload();
    // this._router.navigate(["/clientcomponent/product"]);
  }
}
