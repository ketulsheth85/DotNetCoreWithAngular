import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { RestService } from 'src/app/rest.service';
import { ProductcategoryList } from '../../productcategory/productcategory.metadata';
import { ProdctSubCategoryData } from '../../productsubcategory/productsubcategory.metadata';
import { ProdectMasterList, ProdectMasterListRelation } from '../productmaster.metadata';
import { ProductCat } from '../productmaster.metadata'
import { environment } from '../../../../environments/environment'

import { ProductRelation } from '../productmaster.metadata';

import * as $ from 'jquery';
@Component({
  selector: 'app-productmasterform',
  templateUrl: './productmasterform.component.html',
  styleUrls: ['./productmasterform.component.css']
})
export class ProductmasterformComponent implements OnInit {

  public productCatList: ProductcategoryList[] | any;
  public productList: ProdectMasterList[] | any;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  cities: Array<any> = [];
  selectedProductCat: ProductCat[] | any;
  selectedProductSubCatItems: ProductRelation[] | any;
  selectedProductItems: ProdectMasterListRelation[] | any;
  dropdownSettings: any = {};
  dropdownProSettings: any = {};

  public productDetails: any;
  private name: string | any;
  private productCatId: any;
  userData: any;
  url = '';
  mode: any;
  href: string | any;
  public elementType: "img" | "url" | "canvas" | "svg" | any = null;
  public myAngularxQrCode: string | any = null;
  public productSubCatList: ProdctSubCategoryData[] | any;
  public relationalProduct: ProdectMasterListRelation[] | any;
  private notifier: NotifierService;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private restService: RestService,
    notifier: NotifierService) {
    this.notifier = notifier;
    this.elementType = 'img'
  }

  ngOnInit(): void {
    this.productDetails = {
      productId: 0, productName: '', productImage: '', productImageName: '', qrCode: '', description: '', tag: '', serialNo: '',
      productionNo: '', productionDate: null, warrantyDate: null, status: '', productCat: '', productSubCat: '',
      attributeKey1: '', attributeValue1: '', attributeKey2: '', attributeValue2: '', attributeKey3: '',
      attributeValue3: '', attributeKey4: '', attributeValue4: '', attributeKey5: '', attributeValue5: '',
      attributeKey6: '', attributeValue6: '', attributeKey7: '', attributeValue7: '', attributeKey8: '',
      attributeValue8: '', attributeKey9: '', attributeValue9: '', attributeKey10: '', attributeValue10: '',
      companyId: 0, companyName: '', loginUserID: 0, isActive: 0, op: 0, objProductCat: null, objrelSubcat: null,
      objrelProduct: null
    };
    this.productSubCatList = {
      productSubCategoryId: 0, prodcuctCategoryId: 0
      , selectedID: '', name: '', companyId: 0, isActive: true,
      isDelete: true, createdBy: 0, updatedBy: 0, op: 0, isCompanyFlag: 0
    };
    this.relationalProduct = {
      relationalProductId: 0, productName: '', productImage: '', productId: 0, productionDate: null, productionNo: ''
    }
    this.cities = this.productSubCatList;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'productSubCategoryId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
    this.dropdownProSettings = {
      singleSelection: false,
      idField: 'productId',
      textField: 'productName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
    this.url = environment.imageUrl;
    const id = this._route.snapshot.params.id;
    var recordMode = this._route.snapshot.params.recordMode;
    this.mode = "Edit";
    this.name = "";
    this.productCatId = "";
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.getProducDetails(id, recordMode);
    this.loadProductCategory();
    //this.loadProducts();
  }
  setMyBgColor(bgColorVal: any) {
    let styles = {
      'background-color': bgColorVal
    };
    return styles;
  }
  private getProducDetails(id: number, recordMode: any) {

    // id = parseInt(id.toString());
    this.restService.getAllData('Product/GetProductList?id=0&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((res: any) => {
        this.productList = res;

      }, error => this.notifier.notify("error", error.title));
    if (id === 0 || id === undefined) {

      this.productDetails;
    }
    else {
      this.restService.getAllData('Product/GetProductList?id=' + id + '&companyId=' + this.userData.companyId
        + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
        .subscribe((result: any) => {

          if (recordMode.toString() == "0") {
            this.mode = "Edit";
          }
          else {
            this.mode = "View";
          }
          this.productDetails = Object.assign({}, result[0]);
          this.productDetails.productCat = result[0].productCat;
          this.productDetails.productSubCat = result[0].productSubCat.split(',');
          this.myAngularxQrCode = result[0].qrCode;
          this.productDetails.productImage = this.url + result[0].productImage;
          this.name = result[0].productImage;
          this.selectedProductCat = result[0].objProductCat;
          this.selectedProductSubCatItems = result[0].objrelSubcat;
          this.selectedProductItems = result[0].objrelProduct;
          //this.productDetails.selectedRoleId = (result[0].roleId)
        }, error => this.notifier.notify("error", error.title));
    }
  }
  onImageDownload() {
    debugger
    //this.href = $("#qrcodeImage .qrcode img").attr('src');
    const parentElement = $("#qrcodeImage .qrcode img").attr('src');

    // converts base 64 encoded image to blobData
    let blobData = this.convertBase64ToBlob(parentElement);

    // saves as image
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
      window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
    } else { // chrome
      const blob = new Blob([blobData], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank'
      link.download = 'Qrcode';
      link.click();
    }
  }

  private convertBase64ToBlob(Base64Image: any) {
    // SPLIT INTO TWO PARTS
    const parts = Base64Image.split(';base64,');
    // HOLD THE CONTENT TYPE
    const imageType = parts[0].split(':')[1];
    // DECODE BASE64 STRING
    const decodedData = window.atob(parts[1]);
    // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
    const uInt8Array = new Uint8Array(decodedData.length);
    // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // RETURN BLOB IMAGE AFTER CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }

  onBlurQrCode(str: any) {
    debugger
    console.log(str.target.value);
    this.myAngularxQrCode = str.target.value;
  }

  public uploadFile = (files: any) => {

    if (files.target.files && files.target.files[0]) {
      var reader = new FileReader();
      this.name = files.target.files[0].name;
      reader.onload = function (e: any) {

        $('#ProPic').attr('src', e.target.result);
        $('#productImage').val(e.target.result);
      }

      reader.readAsDataURL(files.target.files[0]);
    }
    else {
      this.name = "";
    }
  }
  loadProductCategory() {

    this.restService.getAllData('ProductCategory/GetProductCategory?id=0&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag)
      .subscribe((res: any) => {
        this.productCatList = res;
      }, error => this.notifier.notify("error", error.title))
  }
  loadProducts() {


  }
  onProducCatChange(value: any) {

    $('#productSubCat')

    // this.productCatId=value.target.value;
    // this.getProductSubCat();
    this.restService.getAllData('ProductSubCategory/GetProductSubCategories?id=0&companyId=' + this.userData.companyId
      + '&IsCompanyFlag=' + this.userData.isCompanyFlag + '&ProductCategoryID=' + value.target.value)
      .subscribe((res: any) => {

        //this.productCatId = res;
        // this.productSubCatList.prodcuctCategoryId = value.target.value;
        this.productSubCatList = res;
      }, error => this.notifier.notify("error", error.title));
    //this.productSubCatList = this.productCatId;
    this.productDetails.productCat = value.target.value;
  }
  onProductSubCatChange(value: any) {

    console.log("value", value);
    var subCategory: any = [],
      productSubCategoryId;
    // for(var i = 0; i < value.length; i++){
    //   subCategory = subCategory.concat(productSubCategoryId:value[i].productSubCategoryId);
    // }
    productSubCategoryId = Array.prototype.map.call(this.selectedProductSubCatItems, function (item) { return item.productSubCategoryId; }).join(",");
    this.restService.getAllData('Product/GetRelationalProductList?productId=' + this.productDetails.productId + '&productSubCat=' + productSubCategoryId + '&companyId=' + this.userData.companyId)
      .subscribe((res: any) => {
        this.relationalProduct = res;
      }, error => this.notifier.notify("error", error.title));

  }
  // getProductSubCat(){
  //   this.restService.getAllData('ProductSubCategory/GetProductSubCategories?id=0&companyId=' + this.userData.companyId
  //     + '&IsCompanyFlag=' + this.userData.isCompanyFlag + '&ProductCategoryID=' + this.productCatId)
  //     .subscribe((res: any) => {
  //
  //       //this.productCatId = res;
  //       // this.productSubCatList.prodcuctCategoryId = value.target.value;
  //       this.productSubCatList = res;
  //     }, error => this.notifier.notify("error", error.title));
  // }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);

  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }
  onSubmit(value: ProdectMasterList | any) {

    console.log(value);
    if (value.productId == 0) {
      value.op = 1;
      if(String($('#productImage').val()) != ''&& String(this.name) != '')
      {
      value.productImage = String($('#productImage').val());
      value.productImageName = String(this.name);
      }
      else
      {return  this.notifier.notify("error", "No image was uploaded!")}
    }
    else {

      value.op = 2;
      value.productImage = String($('#productImage').val()) != '' ? String($('#productImage').val()) : '';
      value.productImageName = String(this.name);
    }
    value.productId = parseInt(value.productId);
    value.companyId = this.userData["companyId"];
    value.loginUserID = this.userData["userId"];
    //value.relationSubCat = String(value.relationSubCat);relationProduct
    value.productionDate = new Date(value.productionDate);
    value.warrantyDate = new Date(value.warrantyDate);


    value.isCompanyFlag = this.userData.isCompanyFlag;
    value.objrelSubcat = this.selectedProductSubCatItems;
    value.productCat = parseInt(value.productCategory);
    value.productSubCat = Array.prototype.map.call(this.selectedProductSubCatItems, function (item) { return item.productSubCategoryId; }).join(",");
    value.relationalProduct = this.selectedProductItems != undefined ? Array.prototype.map.call(this.selectedProductItems, function (item) { return item.productId; }).join(",") : null;

    this.restService.postData('Product/CRUDProductData', value)
      .subscribe((result: any) => {
        this._router.navigate(['/component/productmaster'])
      }, error => console.log(error));

  }

}
