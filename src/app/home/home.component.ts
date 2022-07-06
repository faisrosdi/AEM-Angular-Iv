import { Component, OnInit } from '@angular/core';
import { Injectable, ElementRef, ViewChild  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as d3 from 'd3';
import { UserService } from '../shared/user.service';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

@Injectable({
  providedIn: 'root'
})
export class HomeComponent implements OnInit {

  constructor(private userServices: UserService) { }

  public userData: any = [];

  private token = this.userServices.getToken();

  ngOnInit(): void {
    this.userServices.getData(JSON.stringify(this.token)).subscribe(
      res => {
        this.userData =  res.tableUsers;
      }
    )
  }
}
