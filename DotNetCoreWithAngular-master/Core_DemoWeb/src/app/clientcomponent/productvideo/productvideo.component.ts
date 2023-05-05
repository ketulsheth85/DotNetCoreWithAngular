import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ProductVideoData } from 'src/app/component/productvideo/productvideo.metadata';
import { RestService } from 'src/app/rest.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-productvideo',
  templateUrl: './productvideo.component.html',
  styleUrls: ['./productvideo.component.css']
})
export class ProductvideoComponent implements OnInit {
  ///Common declared params or
  userData: any;
  public lstproductvideo: ProductVideoData[] | any;
  private videofilename: string | any;
  private notifier: NotifierService;
  productVideoType: any;
  parameter: any;
  noImage = '';
  url='';
  private spinner: NgxSpinnerService| any;

  constructor(private restService: RestService,
    private _router: Router,
    notifier: NotifierService,spinner: NgxSpinnerService) {
    this.spinner = spinner;
    this.parameter = {
      op: 0,
      productId: 0, companyId: 0
    }
    this.notifier = notifier;
    this.spinner.show();
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    var id = Number(localStorage.getItem("ProductId"));
    this.loadVideoList(id);
    this.spinner.hide();
  }

  ngOnInit(): void {
    this.url = environment.imageUrl;
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
    else {
      styles = {
        'background-color': "#041f3e",
      };
    }
    return styles;
  }

  ////Load function for getting all video by company id and video id
  loadVideoList(id: number) {
    this.parameter.Op = 6;
    this.parameter.productId = id;
    this.parameter.companyId = this.userData.companyId;
    this.restService.postData('ProductClient/GetProductVideoClient', this.parameter)
      .subscribe((res: any) => {
        
        if (res.length != 0) {
          this.lstproductvideo = res;
          var indexs = 0;
          res.forEach((e: any) => {
            
            if (e.videoType == 'Other') {
              this.lstproductvideo[indexs].videoUrl = this.url + e.videoUrl;
            }
            else {
              this.lstproductvideo[indexs].videoUrl = e.videoUrl;
            }
            indexs++;
          });
          this.productVideoType = res.map((item: any) => item.videoType)
            .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
        }
        else {
          this.noImage = '../../../assets/images/background/About Us.png'
        }
      }, error => this.notifier.notify("error", error.title))
  }
}
