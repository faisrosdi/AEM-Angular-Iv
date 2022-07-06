import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor( private userServices: UserService) { }

  private pieChartData = [];
  private svg: any;
  private margin_pie = 50;
  private width_pie = 600;
  private height_pie = 400;
  private radius = Math.min(this.width_pie, this.height_pie) / 2 - this.margin_pie;
  private colors: any;
  private token = this.userServices.getToken();
  

  

  ngOnInit(): void {
    this.userServices.getData(JSON.stringify(this.token)).subscribe(
      res => {
        this.pieChartData = res.chartDonut;
        
        this.createSvg();
        this.createColors(this.pieChartData);
        this.drawChart();
      }
    )
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

private createColors(data: any[]): void {
    this.colors = d3.scaleOrdinal()
    .domain(data.map(d => d.value.toString()))
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
}

private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.value));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.pieChartData))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(80)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(this.pieChartData))
    .enter()
    .append('text')
    .text((d: { data: { name: any; }; }) => d.data.name)
    // .attr("transform", (d: d3.DefaultArcObject) => "translate(" + labelLocation.centroid(d) + ")")
    .attr("transform", (d: d3.DefaultArcObject) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
}

  



}
