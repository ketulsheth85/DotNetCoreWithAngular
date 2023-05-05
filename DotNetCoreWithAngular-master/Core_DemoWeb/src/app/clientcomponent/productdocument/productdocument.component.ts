import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import { Productdocumentcleint } from './productdocumentcleint';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-productdocument',
  templateUrl: './productdocument.component.html',
  styleUrls: ['./productdocument.component.css']
})
export class ProductdocumentComponent implements OnInit {

  productDocumentList: Productdocumentcleint[] = [];
  productCatName: any
  userData: any;
  parameter: any;
  url ='';
  noImage = '';
  private spinner: NgxSpinnerService| any;

  constructor(public _route: Router,
    private restService: RestService,spinner: NgxSpinnerService) {
    this.parameter = {
      productId: 0, companyId: 0
    }
    this.spinner = spinner;
    this.spinner.show();
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    var id = Number(localStorage.getItem("ProductId"));
    this.getProductDocumentData(id);
    this.spinner.hide();
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

  ngOnInit(): void {
    this.url = environment.imageUrl;
  }
  getProductDocumentData(id: number) {
    this.parameter.productId = id;
    this.parameter.companyId = this.userData.companyId;
    this.restService.postData('ProductClient/GetProductDocumentClient', this.parameter)
      .subscribe((res: any) => {
        
        if(res.length != 0){
        this.productDocumentList = res;
        var indexs =0;
        res.forEach((e:any) => {
          var ext =  e.docPath.split('.').pop();
          if(ext == 'docx')
          {
            this.productDocumentList[indexs].docPath = this.url + e.docPath;
            this.productDocumentList[indexs].docImage = "../../../assets/images/background/Microsoft-Word-logo-500x491.png";
          }
          else if (ext == 'xlsx')
          {
            this.productDocumentList[indexs].docPath = this.url + e.docPath;
            this.productDocumentList[indexs].docImage = "../../../assets/images/background/excel.png";
          }
          else if (ext == 'png' || ext == 'jpg' || ext == 'jpeg')
          {
            this.productDocumentList[indexs].docPath = this.url + e.docPath;
            this.productDocumentList[indexs].docImage = "../../../assets/images/background/image_icon.jpg";
          }
          else if (ext == 'pdf')
          {
            this.productDocumentList[indexs].docPath = this.url + e.docPath;
            this.productDocumentList[indexs].docImage = "../../../assets/images/background/pdf_logo.png";
          }
          else{
            this.productDocumentList[indexs].docPath = this.url + e.docPath;
            this.productDocumentList[indexs].docImage = "../../../assets/images/background/other_document.png";
          }
          indexs++;
        });
        this.productCatName = res.map((item:any) => item.documentCatName)
        .filter((value:any, index:any, self:any) => self.indexOf(value) === index);
      }
      else{
        this.productDocumentList = res;
        this.productCatName = null;
        this.noImage = '../../../assets/images/background/About Us.png'
      }
        //res.filter((productdocumentcleint:any),(i=0),(arr:any))=> {arr.filteridex}
      })
  }
}
