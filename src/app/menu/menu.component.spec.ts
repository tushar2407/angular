import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MenuComponent } from './menu.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {DISHES} from '../shared/dishes';
import {baseURL} from '../shared/baseurl';
import {Observable, of} from 'rxjs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {By} from '@angular/platform-browser';
//import {DebugElement} from '@agular/core';  // helps in testing DOM in templates
import { DebugElement } from '@angular/core';
describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    const dishServiceStub={getDishes:function():Observable<Dish[]>{
        return of(DISHES);
      }
    };
    TestBed.configureTestingModule({
      imports:[
        FlexLayoutModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([{path:'menu', component:MenuComponent}]),
      ],
      declarations: [ MenuComponent ],
      providers:[ // configuring testing module
        {provide:DishService, useValue:dishServiceStub }, // stubbing out the service and not using the original service
        {provide:'BaseURL', useValue:baseURL}
      ]
    })
    .compileComponents();

    const dishservice=TestBed.get(DishService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('dishes items should be 4', ()=>{  // this whole is one test 
    // below are the subparts of the test
    // if all are true only then the test is successful
    expect(component.dishes.length).toBe(4);
    expect(component.dishes[1].name).toBe('Zucchipakoda');
    expect(component.dishes[3].featured).toBeFalsy();
  });
  it('should  use dishes in template',()=>{
    fixture.detectChanges(); // detects changes
    let de:DebugElement;    // access to DOM
    let el:HTMLElement;     // element would be html element
    de=fixture.debugElement.query(By.css('h1')); // this helps to get elements from html
    el=de.nativeElement;
    expect(el.textContent).toContain(DISHES[0].name.toUpperCase());
  }
  
  )
});
