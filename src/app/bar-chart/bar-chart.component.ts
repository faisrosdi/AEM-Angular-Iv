import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor(private userServices: UserService) { }
  private barChartData = [];
  private svg: any;
  private margin = 50;
  private width = 600 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private token = this.userServices.getToken();

  ngOnInit(): void {
    this.userServices.getData(JSON.stringify(this.token)).subscribe(
      res => {
        this.barChartData = res.chartBar;

        this.createSvgBar();
        this.drawBars(this.barChartData);
      }
    )
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
    .domain(data.map(d => d.name))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(0,10)");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 100])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: { name: string; }) => x(d.name))
    .attr("y", (d: { value: d3.NumberValue; }) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d: { value: d3.NumberValue; }) => this.height - y(d.value))
    .attr("fill", "#d04a35")
}

}
