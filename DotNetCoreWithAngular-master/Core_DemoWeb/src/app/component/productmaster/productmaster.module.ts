import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductmasterComponent } from './productmaster.component';
const routes: Routes =[
  {
    path:'',
    data: {
      title: 'ProducMaster',
      urls: [
        { title: 'ProducMaster', url: '/productmaster' },
        { title: 'CompanyMaster' }
      ]
    },
    component: ProductmasterComponent
  }
] 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class ProductmasterModule { }
