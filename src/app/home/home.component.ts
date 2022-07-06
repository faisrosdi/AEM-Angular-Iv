import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as d3 from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

@Injectable({
  providedIn: 'root'
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }


  // Pie Chart
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
  private svg: any;
  private margin_pie = 50;
  private width_pie = 600;
  private height_pie = 400;
  private radius = Math.min(this.width_pie, this.height_pie) / 2 - this.margin_pie;
  private colors: any;

  private svgBar: any;
  private margin = 50;
  private width = 600 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'})};

  ngOnInit(): void {
    console.log(console.log(d3))
    this.createSvg();
    this.createColors();
    this.drawChart();

    this.createSvgBar();
    this.drawBars(this.data);
    
    // console.log(environment.apiBaseUrl + 'dashboard');
    // this.getData().subscribe(
    //   res => {
    //     console.log(res)
    //   }
    // )
  }

  getData() {
      return this.http.get(environment.apiBaseUrl + 'dashboard');
  }

  private createSvg(): void {
      this.svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", this.width_pie)
      .attr("height", this.height_pie)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width_pie / 2 + "," + this.height_pie / 2 + ")"
      );
  }

  private createColors(): void {
      this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.Stars.toString()))
      .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  private drawChart(): void {
      // Compute the position of each group on the pie:
      const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

      // Build the pie chart
      this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

      // Add labels
      const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

      this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: { data: { Framework: any; }; }) => d.data.Framework)
      .attr("transform", (d: d3.DefaultArcObject) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }


  private createSvgBar(): void {
      this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
      // Create the X-axis band scale
      const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Framework))
      .padding(0.2);

      // Draw the X-axis on the DOM
      this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(0,10)");

      // Create the Y-axis band scale
      const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);

      // Draw the Y-axis on the DOM
      this.svg.append("g")
      .call(d3.axisLeft(y));

      // Create and fill the bars
      this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: { Framework: string; }) => x(d.Framework))
      .attr("y", (d: { Stars: d3.NumberValue; }) => y(d.Stars))
      .attr("width", x.bandwidth())
      .attr("height", (d: { Stars: d3.NumberValue; }) => this.height - y(d.Stars))
      .attr("fill", "#d04a35");
  }
}
