import { Injectable } from '@angular/core';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }
  public handleError(error: HttpErrorResponse | any){
    let errMsg:string;
    if(error.error instanceof ErrorEvent){
      errMsg=error.error.message;
    }
    else{ // means coming from server
      errMsg=`${error.status}-${error.statusText || ''} ${error.error}`;
      // if error text then error.statusText else empty string
    }
    return throwError(errMsg);
  }
}
