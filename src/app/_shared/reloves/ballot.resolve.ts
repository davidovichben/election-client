import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {BallotService} from "../services/http/ballot.service";

@Injectable()
export class BallotResolve implements Resolve<any> {

  constructor(private ballotService: BallotService) {}

  resolve(snapshot: ActivatedRouteSnapshot) {
    return this.ballotService.getBallotsVotes().then(response => response);
  }
}
