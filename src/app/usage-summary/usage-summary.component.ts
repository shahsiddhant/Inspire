import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsageService } from '../shared/services/usage.service';
import { HomeScore } from '../shared/models/home-score';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-usage-summary',
  templateUrl: './usage-summary.component.html',
  styleUrls: ['./usage-summary.component.scss']
})

export class UsageSummaryComponent implements OnInit, OnDestroy {
  public currentHomeScore: HomeScore;
  private accountId: string;
  private navigationEvents;
  public accountName: string;

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

    // Some form of personalization that will come from some API
    if (this.accountId === '1') {
      this.accountName = 'Anna';
    } else if (this.accountId === '2') {
      this.accountName = 'John';
    }

    this.usageService.getScore(this.accountId).subscribe((res: HomeScore) => {
      this.currentHomeScore = res;
    });
  }

  ngOnDestroy() {
    if (this.navigationEvents) {
      this.navigationEvents.unsubscribe();
    }
  }

}
