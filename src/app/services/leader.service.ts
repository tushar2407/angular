import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import {Observable,of} from 'rxjs';
import {delay, catchError, map} from 'rxjs/operators'; 
//import { resolve } from 'dns';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import {baseURL} from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor( private http:HttpClient,
    private processHttpMsgService: ProcessHTTPMsgService) { }
  //getLeaders():Promise<Leader[]>{
  getLeaders():Observable<Leader[]>{
    //return Promise.resolve(LEADERS);
    // return new Promise(resolve =>{
    //   setTimeout(()=> resolve(LEADERS),2000);
    // });
    //return of(LEADERS).pipe(delay(2000)).toPromise();
    //return of(LEADERS).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL+'leadership/')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
  getFeaturedLeader():Observable<Leader>{
    //return Promise.resolve(LEADERS.filter((leader)=>leader.featured)[0]);
    // return new Promise(resolve=>{
    //   setTimeout(()=>resolve(LEADERS.filter((leader)=>leader.featured)[0]),2000);
    // });
    //return of(LEADERS.filter((leader)=>leader.featured)[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL+'leadership?featured=true')
    .pipe(map(leader=>leader[0]))
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
