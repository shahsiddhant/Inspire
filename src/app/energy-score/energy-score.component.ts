import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsageService } from '../shared/services/usage.service';
import { HomeScore } from '../shared/models/home-score';
import { DailyUsage } from '../shared/models/daily-usage';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-energy-score',
  templateUrl: './energy-score.component.html',
  styleUrls: ['./energy-score.component.scss']
})


// TODO Change name to UsageSummary
export class EnergyScoreComponent implements OnInit, OnDestroy {
  public currentHomeScore: HomeScore;
  private accountId: string;
  private navigationEvents;

  constructor(
    private usageService: UsageService,
    private router: Router,
    private route: ActivatedRoute) {
    this.navigationEvents = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {

    this.accountId = this.route.snapshot.params['id'];
    this.usageService.getScore(this.accountId).subscribe((res: HomeScore) => {
      this.currentHomeScore = res;
    });

    // this.usageService.getDailyUsage('1').subscribe((res: DailyUsage) => {
    //   res.daily_energy_usage.forEach(date => {
    //     const key = Object.keys(date)[0];
    //     console.log(key, date[key]);

    //   });
    // });
  }

  ngOnDestroy() {
    if (this.navigationEvents) {
      this.navigationEvents.unsubscribe();
    }
  }

}
