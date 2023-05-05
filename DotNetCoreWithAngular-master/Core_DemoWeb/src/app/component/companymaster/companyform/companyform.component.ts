import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyData } from '../companymaster.metadata';
import { RestService } from '../../../rest.service';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
@Component({
  selector: 'app-companyform',
  templateUrl: './companyform.component.html',
  styleUrls: ['./companyform.component.css']
})
export class CompanyformComponent implements OnInit {
  private name: string | any;
  userData: any;
  url = '';
  mode='';
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private restService: RestService) {

  }
  companydetail: any;
  //  public companydetail: CompanyData[]| unde;
  ngOnInit(): void {
    this.companydetail = {
      companyID: 0, companyName: "", companyAdress: "", companyPhone: "", companyFax: "", companyZip: "",
      companyLogo: '', companyLogos: '', companyCode: "", postAddress: "", city: "", country: "",
      colorCode: "", companyEmail: "", parentCompanyID: 0,
      companyLevel: 0, op: 0
    };
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    var d = this._route.snapshot.params.id;
    var flag: number = this._route.snapshot.params.flag;
    var id: number = +(d == undefined ? 0 : d)
    this.getCompanyDetails(id,flag);
    this.name = null;
    this.url = environment.imageUrl;
    this.mode = "Edit";
  }
  setMyBgColor(bgColorVal: any) {
    let styles = {
      'background-color': bgColorVal,
    };
    return styles;
  }
  private getCompanyDetails(id: number,flag: number) {
    if (id === 0 || id == NaN) {
      this.companydetail;
    }
    else {
      this.restService.getAllData('Company/GetCompanyList?id=' + id)
        .subscribe((result: any) => {

          if(flag.toString() =="0"){
            this.mode = "Edit";
          }
          else{
            this.mode = "View";
          }
          this.companydetail = Object.assign({}, result[0]);
          this.companydetail.companyLogo = this.url + result[0].companyLogo;
        }, error => console.log(error));

    }

  }

  public uploadFile = (files: any) => {

    if (files.target.files && files.target.files[0]) {
      var reader = new FileReader();
      this.name = files.target.files[0].name;
      reader.onload = function (e: any) {

        $('#ProPic').attr('src', e.target.result);
        $('#CompanyLogo').val(e.target.result);
      };
      reader.readAsDataURL(files.target.files[0]);
    } else {
      this.name = "";
    }
  }



  onSubmit(value: any) {

    console.log(value)
    value.CompanyID = parseInt((value.CompanyID == '' ? "0" : value.CompanyID))
    if (value.CompanyID == 0) {
      value.Op = 1
      value.CompanyLogo = $('#CompanyLogo').val();
      value.CompanyLogos = this.name;
    }
    else {
      value.Op = 2
      if($('#CompanyLogo').val() !='')
      {
        value.CompanyLogo = $('#CompanyLogo').val();
        value.CompanyLogos = this.name;
      }
      else
      {
        value.CompanyLogo = String(this.name);
        value.CompanyLogos = '';
      }
    }


    value.parentCompanyID = this.userData.companyId;
    value.CompanyLevel = this.userData.companyLevel;
    this.restService.postData('Company/CRUDComanyData', value)
      .subscribe((result: any) => {
        this._router.navigate(['/component/customermaster'])
      }, error => console.log(error));

  }
}
