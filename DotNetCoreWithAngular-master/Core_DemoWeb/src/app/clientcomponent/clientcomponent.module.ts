import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientcomponentRoutes } from './clientcomponent.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchproductComponent } from './searchproduct/searchproduct.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ProductComponent } from './product/product.component';
import { ProductdocumentComponent } from './productdocument/productdocument.component';
import { ProductvideoComponent } from './productvideo/productvideo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyProductpipePipe, MyVideoFilter, SafePipe } from '../my-productpipe.pipe';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin
import listPlugin from '@fullcalendar/list'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import {DatePipe} from '@angular/common'
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClientcomponentRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ZXingScannerModule,
    AutocompleteLibModule,
    FullCalendarModule,
    NgxSpinnerModule,
    NgxDatatableModule
  ],
  declarations: [
    SearchproductComponent,
    ProductComponent,
    ProductdocumentComponent,
    ProductvideoComponent,
    MyProductpipePipe,
    MyVideoFilter,
    SafePipe,
    MyaccountComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[DatePipe]
})
export class ClientcomponentModule { }
