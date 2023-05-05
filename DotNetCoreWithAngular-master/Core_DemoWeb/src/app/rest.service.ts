import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import { Router } from '@angular/router';
import { throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService implements OnInit{

  constructor(private http: HttpClient,
    private router: Router) {


  };
  errorData: {} | undefined;

  getAllData(url: string) {
    return this.http
      .get(environment.ApiUrl + url)
      .pipe(catchError(this.handleError));
  }
  ngOnInit() {
    
  }
  

  postData(url: string, data: any) {
    return this.http
      .post(environment.ApiUrl + url, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log("An error occurred:", error.error.message);
    } else {
      console.log(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    return throwError(error.error);
  }
}
