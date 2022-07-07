import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router , RouterModule} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  model = {
    username: 'user@aemenersol.com',
    password: 'Test@123'
  };

  constructor(private http: HttpClient,private userServices: UserService, private router: Router) { }

  ngOnInit(): void {
    // if(!this.userServices.getToken()) {
    //   this.router.navigateByUrl('dashboard');
    // }
  }

  onSubmit(userLogin: NgForm) {
    this.userServices.login(userLogin.value).subscribe(
      res => {
        this.userServices.setToken(res.toString())
        this.router.navigateByUrl('');
      },
      err => {
        alert(err.statusText)
      },
    )
  }
}
