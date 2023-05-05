import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientfullmenuComponent } from './layouts/clientfullmenu/clientfullmenu.component';
import { ClinetfullComponent } from './layouts/clinetfull/clinetfull.component';

import {FullComponent} from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
export const AppRoutingModule:Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'dashboard',
        component: FullComponent,
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        component: FullComponent,
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'clientcomponent',
        component: ClinetfullComponent,
        loadChildren: () => import('./clientcomponent/clientcomponent.module').then(m => m.ClientcomponentModule)
      },
      // {
      //   path: 'clientcomponent',
      //   component: ClientfullmenuComponent,
      //   loadChildren: () => import('./clientcomponent/clientcomponent.module').then(m => m.ClientcomponentModule)
      // }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
]
