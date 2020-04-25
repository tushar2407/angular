import { Injectable } from '@angular/core';
import{Promotion} from '../shared/promotion';
import{PROMOTION} from '../shared/promotions';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  getPromotions():Promise<Promotion[]>{
    //return Promise.resolve(PROMOTION);
    return new Promise(resolve =>{
      setTimeout(()=>resolve(PROMOTION),2000);
    });
  }
  getPromotion(id:string):Promise<Promotion>{
    //return Promise.resolve(PROMOTION.filter((promotion) => (promotion.id===id))[0]);
    return new Promise(resolve =>{
      setTimeout(()=> resolve(PROMOTION.filter((promotion)=>promotion.id===id)[0]),2000);
    });
  }
  getFeaturedPromotion():Promise<Promotion>{
    //return Promise.resolve(PROMOTION.filter((promotion)=>promotion.featured)[0]);
    return new Promise(resolve=>{
      setTimeout(()=> resolve(PROMOTION.filter((promotion)=>promotion.featured)[0]),2000)
    })
  }
}
