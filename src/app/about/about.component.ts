import { Component, OnInit, Inject } from '@angular/core';
//import {LEADERS} from '../shared/leaders';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
import {flyInOut, expand} from '../animations/app.animations';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[
    flyInOut(), 
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders:Leader[];
  errMess:string;
  constructor( private leaderService:LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    //this.leaders=this.leaderService.getLeaders();
    this.leaderService.getLeaders()
    .subscribe((leaders) => this.leaders=leaders, 
    errmess=> this.errMess=<any>errmess);
  }

}
