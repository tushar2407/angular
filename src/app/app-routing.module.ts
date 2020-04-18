import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {routes } from './routes';
// const routes: Routes = [
//   {path:'home', component:HomeComponent},
//   {path:'menu', component:MenuComponent},
//   {path:'',redirectTo='/home'},
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
