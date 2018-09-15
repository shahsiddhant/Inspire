import { Component, OnInit } from '@angular/core';
import { UsageService } from '../shared/services/usage.service';
import { HomeScore } from '../shared/models/home-score';
import { DailyUsage } from '../shared/models/daily-usage';

@Component({
  selector: 'app-energy-score',
  templateUrl: './energy-score.component.html',
  styleUrls: ['./energy-score.component.scss']
})
export class EnergyScoreComponent implements OnInit {
  public currentHomeScore: HomeScore;
  constructor(private usageService: UsageService) { }

  ngOnInit() {
    this.usageService.getScore('1').subscribe((res: HomeScore) => {
      this.currentHomeScore = res;
      console.log(this.currentHomeScore);
    });


    this.usageService.getDailyUsage('1').subscribe((res: DailyUsage) => {
      res.daily_energy_usage.forEach(date => {
        const key = Object.keys(date)[0];
        console.log(key, date[key]);

      });
    });
  }

}
