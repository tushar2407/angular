import { Component, OnInit } from '@angular/core';
import {MatDialog , MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user={username:'', password:'', remember:false};

  constructor(private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log("User: ", this.user.username); // Just for now printing it 
    // Later will handle the actual login when the server is up
    this.dialogRef.close(); // to close the dialog box that appeared
  }

}
