import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {VoterService} from "src/app/_shared/services/http/voter.service";

@Injectable()
export class StatsResolve implements Resolve<any> {

  constructor(private userService: VoterService) {}

  resolve(snapshot: ActivatedRouteSnapshot) {
    return this.userService.getStats().then(response => response);
  }
}
