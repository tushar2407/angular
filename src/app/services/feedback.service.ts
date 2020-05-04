import { Injectable } from '@angular/core';
import {HttpClient ,  HttpHeaders} from '@angular/common/http';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import {Feedback} from '../shared/feedback';
import { baseURL } from '../shared/baseurl';
import { catchError, map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  postFeedback(feedback:Feedback){
    const HttpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL+'feedback/',feedback,HttpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError),delay(2000));
  }
  getFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(baseURL+'feedback/')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  // getFeedbackIds(): Observable<string[] | any> {
  //   //return of(DISHES.map(dish => dish.id ));
  //   return this.getFeedbacks().pipe(map(feedbacks=>feedbacks.map(dish =>dish.id)))
  //   .pipe(catchError(error => error));
  // }
}
