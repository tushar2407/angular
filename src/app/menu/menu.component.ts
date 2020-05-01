import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from'../shared/dishes';  
import {DishService} from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes:Dish[];
  errMess:string;
  //selectedDish: Dish ;
  constructor(private dishService: DishService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    //this.dishes=this.dishService.getDishes();
    this.dishService.getDishes()
    //.then((dishes) => this.dishes=dishes);
    .subscribe((dishes) => this.dishes=dishes, 
    errmess=>this.errMess=<any>errmess);
  }
  // onSelect(dish : Dish){
  //   this.selectedDish=dish;
  // }
}
