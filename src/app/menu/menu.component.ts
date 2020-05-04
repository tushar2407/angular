import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from'../shared/dishes';  
import {DishService} from '../services/dish.service';
import {flyInOut, expand} from '../animations/app.animations';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host:{        // used when the animation has to be applied to whole component
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[
    flyInOut(),
    expand()
  ]
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
