import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductcategorydetailComponent } from './productcategorydetail/productcategorydetail.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductcategoryComponent } from './productcategory.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'productcategory',
      urls: [
        { title: 'productcategory', url: '/productcategory' },
        { title: 'productcategory' }
      ]
    },
    component: ProductcategoryComponent
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
    
  ]
})
export class ProductcategoryModule { }
