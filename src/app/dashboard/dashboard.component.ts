import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router , RouterModule} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  closeResult = '';
  constructor(private userServices: UserService, private router: Router) { }

  private token = this.userServices.getToken();

  ngOnInit(): void {
    
  }

  signOut() {
    var ask = confirm("Are you sure to logout?")

    if(ask == true)  {
      this.userServices.deleteToken();
      this.router.navigateByUrl('login');
    }
    

  }

  
  

}
