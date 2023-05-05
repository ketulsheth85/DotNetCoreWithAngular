import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanydetailComponent } from './companydetail/companydetail.component';
import { CompanymasterComponent } from './companymaster.component';
import { RouterModule, Routes } from '@angular/router';
import { CompanyformComponent } from './companyform/companyform.component';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'CompanyMaster',
      urls: [
        { title: 'CompanyMaster', url: '/company' },
        { title: 'CompanyMaster' }
      ]
    },
    component: CompanymasterComponent
  } 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)//,NgxDatatableModule
  ]
})
export class CompanymasterModule { }
