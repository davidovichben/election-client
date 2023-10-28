import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class StatisticsComponent {

  @Input() stats: any;

  supportersCount = 0;
  undecidedCount = 0;
  opponentsCount = 0;
  abstainersCount = 0;

  constructor() { }

  ngOnInit(): void {
    if (!this.stats) {

      return;
    }

    this.supportersCount = this.stats.supporter ?? 0;
    this.undecidedCount = this.stats.undecided ?? 0;
    this.opponentsCount = this.stats.opponent ?? 0;
    this.abstainersCount = this.stats.abstainer ?? 0;
  }
}
