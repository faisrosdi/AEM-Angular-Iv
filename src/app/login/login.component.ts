import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router , RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('start');

    
  }

  onSubmit(userLogin: NgForm) {
    console.log(userLogin);
  }

}
