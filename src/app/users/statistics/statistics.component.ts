import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  @Input() stats: any;

  supportersCount: number = 0;
  undecidedCount: number = 0;
  opponentsCount: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (!this.stats) {
      return;
    }

    this.supportersCount = this.stats.supporter ?? 0;
    this.undecidedCount = this.stats.undecided ?? 0;
    this.opponentsCount = this.stats.opponent ?? 0;
  };
}
