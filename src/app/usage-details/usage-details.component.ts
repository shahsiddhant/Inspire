import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsageService } from '../shared/services/usage.service';
import * as d3 from 'd3';
import { DailyUsage } from '../shared/models/daily-usage';
import { HomeScore } from '../shared/models/home-score';
@Component({
  selector: 'app-usage-details',
  templateUrl: './usage-details.component.html',
  styleUrls: ['./usage-details.component.scss']
})
export class UsageDetailsComponent implements OnInit {

  @ViewChild('chart')
  public chartElement: ElementRef;

  public accountId: string;
  public usageBreakdown: DailyUsage;
  public type: string;
  private chartProps: any;
  public threshold: DailyUsage;
  public text: string;

  constructor(
    private route: ActivatedRoute,
    private usageService: UsageService
  ) { }

  ngOnInit() {

    this.accountId = this.route.snapshot.params['id'];

    this.usageService.getScore(this.accountId).subscribe((scoreRes: HomeScore) => {

      // Hypothetical threshold
      if (scoreRes.score > 50) {
        this.usageService.getDailyUsage(this.accountId).subscribe((res: DailyUsage) => {
          this.usageBreakdown = res;

          // get average usage for good customers
          this.usageService.getAverageUsage().subscribe((response: DailyUsage) => {
            this.threshold = response;
            this.buildChart();
            this.text = 'Average Usage';
            this.type = 'ideal';
          });
        });

      } else {
        this.usageService.getDailyUsage(this.accountId).subscribe((res: DailyUsage) => {
          this.usageBreakdown = res;

          // get ideal usage for below average customer
          this.usageService.getIdealUsage().subscribe((response: DailyUsage) => {
            this.threshold = response;
            this.buildChart();
            this.text = 'Ideal Usage';
            this.type = 'avg';
          });
        });
      }
    });
  }

  // Build the SVG d3 usage chart
  buildChart() {
    this.chartProps = {};

    // Set the dimensions of the canvas / graph
    const margin = { top: 30, right: 20, bottom: 30, left: 30 },
      width = this.chartElement.nativeElement.clientWidth - margin.left - margin.right,
      height = this.chartElement.nativeElement.clientHeight - margin.top - margin.bottom;

    // Set the ranges
    this.chartProps.x = d3.scaleTime().domain([new Date(2016, 11, 1), new Date(2016, 11, 31)]).range([0, width]);
    this.chartProps.y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    // Define the axes
    const xAxis = d3.axisBottom(this.chartProps.x).ticks(5);
    const yAxis = d3.axisLeft(this.chartProps.y).ticks(5);

    // Define the line
    const lineValues = d3.line<any>().x((d) => {
      const key = Object.keys(d)[0];
      return this.chartProps.x(new Date(key));

    }).y((d) => {
      const key = Object.keys(d)[0];
      return this.chartProps.y(d[key]);
    });

    // Chart
    const svg = d3.select(this.chartElement.nativeElement)
      .append('svg')
      .attr('width', '90vw')
      .attr('height', '60vh')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Customer usage line.
    svg.append('path')
      .attr('class', 'line line1')
      .style('stroke', 'blue')
      .style('stroke-width', '3')
      .style('fill', 'none')
      .attr('d', lineValues(this.usageBreakdown.daily_energy_usage));

    // Threshold Usage line
    svg.append('path')
      .attr('class', 'line line2')
      .style('stroke', 'red')
      .style('stroke-width', '3')
      .style('fill', 'none')
      .attr('d', lineValues(this.threshold.daily_energy_usage));

    // Add the X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    // Add the Y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);
  }
}
