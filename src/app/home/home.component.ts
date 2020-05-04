import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
import {flyInOut,  expand} from '../animations/app.animations';
//import { baseURL } from '../shared/baseurl';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[
    flyInOut(), expand()
  ]
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion:Promotion;
  errDishMes:string;
  errLeaderMes:string;
  errPromotionMes:string;
  leader:Leader;
  constructor( private dishService: DishService, 
    private promotionService: PromotionService,
    private leaderService : LeaderService,
    @Inject("BaseURL") public BaseURL) { }

  ngOnInit(): void {
    //console.log(baseURL);
    //this.leader=this.leaderService.getFeaturedLeader();
    this.leaderService.getFeaturedLeader()
    .subscribe((leader)=> this.leader=leader,
    errmess=> this.errLeaderMes=<any>errmess);
    //this.dish= this.dishService.getFeaturedDish();
    this.dishService.getFeaturedDish()
    .subscribe((dish)=>this.dish=dish, 
    errmess=> this.errDishMes=<any>errmess);
    //this.promotion= this.promotionService.getFeaturedPromotion();
    this.promotionService.getFeaturedPromotion()
    .subscribe((promotion)=>this.promotion=promotion, 
    errmess=> this.errPromotionMes=<any>errmess);
  }

}
