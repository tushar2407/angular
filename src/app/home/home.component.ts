import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion:Promotion;
  errMes:string;
  leader:Leader;
  constructor( private dishService: DishService, 
    private promotionService: PromotionService,
    private leaderService : LeaderService,
    @Inject("BaseURL") public BaseURL) { }

  ngOnInit(): void {
    //this.leader=this.leaderService.getFeaturedLeader();
    this.leaderService.getFeaturedLeader()
    .subscribe((leader)=> this.leader=leader);
    //this.dish= this.dishService.getFeaturedDish();
    this.dishService.getFeaturedDish()
    .subscribe((dish)=>this.dish=dish, 
    errmess=> this.errMes=<any>errmess);
    //this.promotion= this.promotionService.getFeaturedPromotion();
    this.promotionService.getFeaturedPromotion()
    .subscribe((promotion)=>this.promotion=promotion);
  }

}
