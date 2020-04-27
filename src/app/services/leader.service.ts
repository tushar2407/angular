import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import {Observable,of} from 'rxjs';
import {delay} from 'rxjs/operators'; 
//import { resolve } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  //getLeaders():Promise<Leader[]>{
  getLeaders():Observable<Leader[]>{
    //return Promise.resolve(LEADERS);
    // return new Promise(resolve =>{
    //   setTimeout(()=> resolve(LEADERS),2000);
    // });
    //return of(LEADERS).pipe(delay(2000)).toPromise();
    return of(LEADERS).pipe(delay(2000));
  }
  getFeaturedLeader():Observable<Leader>{
    //return Promise.resolve(LEADERS.filter((leader)=>leader.featured)[0]);
    // return new Promise(resolve=>{
    //   setTimeout(()=>resolve(LEADERS.filter((leader)=>leader.featured)[0]),2000);
    // });
    return of(LEADERS.filter((leader)=>leader.featured)[0]).pipe(delay(2000));
  }
}
