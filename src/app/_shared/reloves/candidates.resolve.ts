import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {CandidateService} from "../services/http/candidate.service";

@Injectable()
export class CandidatesResolve implements Resolve<any> {

  constructor(private candidateService: CandidateService) {}

  resolve(snapshot: ActivatedRouteSnapshot) {
    // @ts-ignore
    return this.candidateService.getCandidates().then(response => response);
  }
}
