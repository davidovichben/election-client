import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {PartyService} from "../services/http/party.service";

@Injectable()
export class PartiesResolve implements Resolve<any> {

  constructor(private partiesService: PartyService) {}

  resolve(snapshot: ActivatedRouteSnapshot) {
    return this.partiesService.getParties().then(response => response);
  }
}
