import { Injectable } from '@angular/core';
import{Promotion} from '../shared/promotion';
import{PROMOTION} from '../shared/promotions';
import { Observable, of } from 'rxjs';
import {delay, map, catchError} from 'rxjs/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import {baseURL} from '../shared/baseurl';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,
    private processHttpMsgService: ProcessHTTPMsgService) { }
  getPromotions():Observable<Promotion[]>{
    //return Promise.resolve(PROMOTION);
    // return new Promise(resolve =>{
    //   setTimeout(()=>resolve(PROMOTION),2000);
    // });
    //return of(PROMOTION).pipe(delay(2000)).toPromise();  
    //return of(PROMOTION).pipe(delay(20000));
    return this.http.get<Promotion[]>(baseURL+'promotions/')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
  /*
    when return promises below line shows howto
  */
  //getPromotion(id:string):Promise<Promotion>{
  getPromotion(id:string):Observable<Promotion>{
    //return Promise.resolve(PROMOTION.filter((promotion) => (promotion.id===id))[0]);
    // return new Promise(resolve =>{
    //   setTimeout(()=> resolve(PROMOTION.filter((promotion)=>promotion.id===id)[0]),2000);
    // });
    //return of(PROMOTION.filter((promotion)=>(promotion.id===id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL+'promotions/'+id)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
  getFeaturedPromotion():Observable<Promotion>{
    //return Promise.resolve(PROMOTION.filter((promotion)=>promotion.featured)[0]);
    // return new Promise(resolve=>{
    //   setTimeout(()=> resolve(PROMOTION.filter((promotion)=>promotion.featured)[0]),2000)
    // })
    //return of(PROMOTION.filter((promotion)=>promotion.featured)[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL+'promotions?featured=true')
    .pipe(map(promotion=>promotion[0]))
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
