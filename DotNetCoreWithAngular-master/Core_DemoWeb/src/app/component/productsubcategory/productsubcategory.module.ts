import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsubcategoryComponent } from './productsubcategory.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'productsubcategory',
      urls: [
        { title: 'productsubcategory', url: '/productsubcategory' },
        { title: 'productsubcategory' }
      ]
    },
    component: ProductsubcategoryComponent
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class ProductsubcategoryModule { }
