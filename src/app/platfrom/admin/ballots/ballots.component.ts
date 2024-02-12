import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BallotModel} from "../../../_shared/models/Ballot.model";

@Component({
  selector: 'app-ballots',
  templateUrl: './ballots.component.html',
  styleUrls: ['./ballots.component.css']
})
export class BallotsComponent implements OnInit {

  // @ts-ignore
  ballots: BallotModel[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // @ts-ignore
    this.ballots = this.route.snapshot.data.ballots;
  }
}
