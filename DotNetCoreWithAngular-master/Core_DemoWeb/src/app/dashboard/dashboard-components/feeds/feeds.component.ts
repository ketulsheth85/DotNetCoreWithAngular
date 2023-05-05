import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Feeds, Feed } from './feeds-data';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  private spinner: NgxSpinnerService| any;
  feeds: Feed[];
  userData: any;
  constructor(private restService: RestService,spinner: NgxSpinnerService) {
    var user = localStorage.getItem('userSession');
    this.userData = JSON.parse((user != null ? user : ''));
    this.feeds = Feeds;
    this.spinner = spinner;
    this.loadDashbordData();
    //this.feeds[0].count =
  }

  ngOnInit(): void {
  }
  loadDashbordData() {
    this.spinner.show();
    var id = this.userData.companyId
    this.restService.getAllData("User/GetDashboardCount?CompanyId=" + id + "&UserId=" + this.userData.userId)
      .subscribe((res:any)=>{
        this.spinner.hide();
        debugger
        //customer
        this.feeds[0].count = res.companyCount
        //location
        this.feeds[1].count = res.locationCount
        //user
        this.feeds[2].count = res.userCount
        //product cat
        this.feeds[3].count = res.productCatCount
        //product sub cat
        this.feeds[4].count = res.productSubCount
        //prosuct master
        this.feeds[5].count = res.productCount
        //video master
        this.feeds[6].count = res.videoCount//res.documentCount
        //document category
        this.feeds[7].count = res.documentCatCount//res.faqCount
        //Product document
        this.feeds[8].count = res.documentCount//res.checkListCount
      })
  }
}
