import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { UsermasterComponent } from './usermaster.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'UserMaster',
      urls: [
        { title: 'UserMaster', url: '/user' },
        { title: 'UserMaster' }
      ]
    },
    component: UsermasterComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})

export class UsermasterModule { }
