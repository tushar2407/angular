import { Component, OnInit, Input } from '@angular/core';
import {Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; // enables to track the location of webpage in history of the browser
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  //@Input()
  dish:Dish;
  constructor( private dishService: DishService, 
            private location : Location,
            private route: ActivatedRoute) { }

  ngOnInit(): void {
    // helps define url as /dishdetail/1 
    let id = this.route.snapshot.params['id'];
    this.dish=this.dishService.getDish(id);
  }
  goBack():void {
    this.location.back();
  }

}
