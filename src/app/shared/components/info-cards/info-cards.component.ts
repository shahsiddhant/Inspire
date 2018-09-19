import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss']
})
export class InfoCardsComponent implements OnInit {

  @Input() accountType: string;
  public displayText: string;

  constructor() { }

  ngOnInit() {
    if (this.accountType === 'ideal') {
      this.displayText = 'Your energy usage is better than other homes like yours!';
    } else if (this.accountType === 'avg') {
      this.displayText = 'Call us now to find out how you can improve your usage.';
    }
  }

}
