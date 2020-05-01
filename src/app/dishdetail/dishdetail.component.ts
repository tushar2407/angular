import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import {Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; // enables to track the location of webpage in history of the browser
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {switchMap} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Comment } from "../shared/comment";
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  //@Input()
  dish:Dish;
  dishIds:string[];
  prev:string;
  next:string;
  errMes:string;
  commentForm:FormGroup;
  comment:Comment;
  dishCopy:Dish;
  @ViewChild('cform') commentFormDirective;
  formErrors={
    'author':'',
    'comment':'',
    'rating':5,
  };
  validationMessages={
    'author':{
      'required':'Name required',
      'minlength':'Minimum length should be 2',
    },
    'comment':{
      'required':"Comment is required"
    },
    'rating':{
      'required':"Stars are required"
    }
  };
  constructor( private dishService: DishService, 
            private location : Location,
            private route: ActivatedRoute, 
            private cf:FormBuilder,
            @Inject("BaseURL") public BaseURL) {
              //this.createForm();
             }
  
  ngOnInit() {
    this.createForm();
    // helps define url as /dishdetail/1 
    //const id = this.route.snapshot.params['id'];
    //this.dish=this.dishService.getDish(id);

    // this.dishService.getDish(id)
    // .subscribe((dish)=>this.dish=dish);
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish, this.dishCopy=dish; this.setPrevNext(dish.id); },
    errmess => this.errMes=<any>errmess);
    //console.log(this.dish);
  }
  setPrevNext(dishId:string){
    // const index=this.dishIds.indexOf(dishId);
    // this.prev=this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length];
    // this.next=this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length];
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  createForm(){
    this.commentForm=this.cf.group({
      author:['',[Validators.required, Validators.minLength(2)]],
      comment:['',Validators.required],
      rating:[5, Validators.required],
      date:[''],
    });
    this.commentForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any){
    if(!this.commentForm){return;}
    const form=this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        // clear previous error messages (if any)
        this.formErrors[field]='';
        const control= form.get(field);
        if(control && control.dirty && !control.valid){
          const messages= this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key]+" ";
            }
          }
        }
      }
    }
  }
  onSubmit(){
    let d= new Date();
    let e=d.toDateString().slice(4);
    this.comment=this.commentForm.value;
    this.comment.date=e;
    this.dishCopy.comments.push(this.comment);
    this.dishService.putdish(this.dishCopy)
    .subscribe(dish => {
      this.dish=dish, this.dishCopy=dish;
    },
    errmess=>{this.dish=null, this.dishCopy=null; this.errMes=<any>errmess; });
    this.commentForm.reset({
      author:'',
      comment:'',
      rating:5
    });
    this.commentFormDirective.resetForm();
  }
  goBack():void {
    console.log(this.location.back);
    this.location.back();
  }

}
