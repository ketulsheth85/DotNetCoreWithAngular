import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { CompanymasterComponent } from './companymaster/companymaster.component';
import { CompanydetailComponent } from './companymaster/companydetail/companydetail.component';
import { CompanyformComponent } from './companymaster/companyform/companyform.component';
import { UsermasterComponent } from './usermaster/usermaster.component';
import { UserdetailsComponent } from './usermaster/userdetails/userdetails.component';
import { UserformComponent } from './usermaster/userform/userform.component';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { ProductcategorydetailComponent } from './productcategory/productcategorydetail/productcategorydetail.component';
import { ProductsubcategoryComponent } from './productsubcategory/productsubcategory.component';
import { ProductsubcategorydetailComponent } from './productsubcategory/productsubcategorydetail/productsubcategorydetail.component';
import { ProductmasterComponent } from './productmaster/productmaster.component';
import { ProductmasterdetailComponent } from './productmaster/productmasterdetail/productmasterdetail.component';
import { ProductmasterformComponent } from './productmaster/productmasterform/productmasterform.component';
import { ProductvideoComponent } from './productvideo/productvideo.component';
import { ProductvideodetailComponent } from './productvideo/productvideodetail/productvideodetail.component';
import { DocumentcategoryComponent } from './documentcategory/documentcategory.component';
import { DocumentcategorydetailComponent } from './documentcategory/documentcategorydetail/documentcategorydetail.component';
import { ProductdocumentComponent } from './productdocument/productdocument.component';
import { ProductdocumentdetailComponent } from './productdocument/productdocumentdetail/productdocumentdetail.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LocationmasterComponent } from './locationmaster/locationmaster.component';
import { UserprofieComponent } from './usermaster/userprofie/userprofie.component';
import { UserprofileeditComponent } from './usermaster/userprofie/userprofileedit/userprofileedit.component';
import { SafeVideoPipe} from '../my-productpipe.pipe';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin
import listPlugin from '@fullcalendar/list'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import {DatePipe} from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxSpinnerModule } from "ngx-spinner";

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDatatableModule,
    NgMultiSelectDropDownModule.forRoot(),
    QRCodeModule,
    NgxSpinnerModule
  ],
  declarations: [
    SafeVideoPipe,
    CompanymasterComponent,
    CompanydetailComponent,
    CompanyformComponent,
    UsermasterComponent,
    UserdetailsComponent,
    UserformComponent,
    ProductcategoryComponent,
    ProductcategorydetailComponent,
    ProductsubcategoryComponent,
    ProductsubcategorydetailComponent,
    ProductmasterComponent,
    ProductmasterdetailComponent,
    ProductmasterformComponent,
    ProductvideoComponent,
    ProductvideodetailComponent,
    DocumentcategoryComponent,
    DocumentcategorydetailComponent,
    ProductdocumentComponent,
    ProductdocumentdetailComponent,
    LocationmasterComponent,
    UserprofieComponent,
    UserprofileeditComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[DatePipe]

})
export class ComponentsModule { }
