import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Feedback , ContactType} from '../shared/feedback';
import {flyInOut, expand} from '../animations/app.animations';
import {FeedbackService} from '../services/feedback.service';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm:FormGroup;
  feedback:Feedback;
  feedbacks:Feedback[];
  errMess:String;
  flag:String=null;
  contactType=ContactType;
  @ViewChild('fform') feedbackFormDirective;

  formErrors={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':'',
  };

  validationMessages={
    'firstname':{
      'required':'First Name is required',
      'minlength':'should be atleast 2 length',
      'maxlength':'should be less than 25 length'
    },
    'lastname':{
      'required':'Last Name is required',
      'minlength':'should be atleast 2 length',
      'maxlength':'should be less than 25 length'
    },
    'telnum':{
      'required':'Tel num required is required',
      'pattern':'should only be numbers'
    },
    'email':{
      'required':'Email is required',
      'email':'Invalid email'
    }
  };
  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) { 
    //this.createForm();
  }

  ngOnInit(): void {
    this.createForm();
    this.feedbackService.getFeedbacks()
    .subscribe((feedbacks)=>this.feedbacks=feedbacks,
    errMess=>this.errMess=<any>errMess);
  }
  createForm(){
    this.feedbackForm=this.fb.group({
      firstname:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum:[0,[Validators.required, Validators.pattern]],
      email:['',[Validators.required, Validators.email]],
      contacttype:'None',
      agree:false,
      message:''
    });

    this.feedbackForm.valueChanges
    .subscribe(data=> this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any){
    if(!this.feedbackForm){return;}
    const form=this.feedbackForm;
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
    //this.feedback= this.feedbackForm.value;
    //console.log(this.feedback);
    this.flag="false";
    setTimeout(()=>{this.flag=null; this.feedback=this.feedbackForm.value;
      this.feedbackForm.reset({
        firstname:'',
        lastname:'',
        telnum:0,
        email:'',
        contacttype:'None',
        agree:false,
        message:''
      });}, 2000);
    this.feedbackService.postFeedback(this.feedback)
    .subscribe(feedback=>this.feedbacks.push(feedback));
    //this.flag=null;
    //this.sleep(5000);
    //this.feedback=null;
    // this.feedbackForm.reset({
    //   firstname:'',
    //   lastname:'',
    //   telnum:0,
    //   email:'',
    //   contacttype:'None',
    //   agree:false,
    //   message:''
    // });
    this.a();
    //this.feedback=null;
    //this.feedbackFormDirective.resetForm();
  }
  a(){
    setTimeout(()=>{ this.feedback = null }, 5000);
    //this.feedback=null;
    this.feedbackFormDirective.resetForm();
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
 
}
