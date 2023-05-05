import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,AutocompleteLibModule
  ]
})
export class LoginModule { }
