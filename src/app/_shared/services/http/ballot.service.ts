import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from 'src/app/_shared/services/http/base-http.service';
import { DataTableResponse } from 'src/app/_shared/services/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/_shared/services/data-table/classes/data-table-criteria';
import { UserSessionService } from "src/app/_shared/services/http/user-session.service";
import {BallotModel} from "../../models/Ballot.model";


@Injectable()
export class BallotService extends BaseHttpService {

  readonly endPoint = this.apiUrl + 'ballots';

  constructor(private http: HttpClient, userSession: UserSessionService) {
    super(userSession);
  }

  getBallots(criteria: DataTableCriteria): Promise<DataTableResponse> {
    const params = this.getDataTableParams(criteria);

    // @ts-ignore
    return this.http.post(this.endPoint + '/search', params, this.getTokenRequest(null, true))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  addVotes(values: object): Promise<boolean> {
    return this.http.post(this.endPoint + '/votes', values, this.getTokenRequest())
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  getBallotsVotes(): Promise<BallotModel> {
    // @ts-ignore
    return this.http.get(this.endPoint, this.getTokenRequest())
      .toPromise()
      .then(response => response as BallotModel)
      .catch(() => null);
  }

  getBallot(keyword: number): Promise<BallotModel> {
    // @ts-ignore
    return this.http.get(this.endPoint + '/' + keyword, this.getTokenRequest())
      .toPromise()
      .then(response => response as BallotModel)
      .catch(() => null);
  }

  newBallot(values: object): Promise<boolean> {
    return this.http.post(this.endPoint, values, this.getTokenRequest())
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  // @ts-ignore
  updateBallot(ballotId, field): Promise<any> {
    return this.http.put(this.endPoint + '/' + ballotId, field, this.getTokenRequest())
      .toPromise()
      .then(response => response)
      .catch(() => false);
  }

  multipleUpdate(checkedItems: any[], values: object): Promise<boolean> {
    return this.http.put(this.endPoint + '/multipleUpdate', { checkedItems, ...values }, this.getTokenRequest())
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteBallot(ballotId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + ballotId, this.getTokenRequest())
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  checkExists(ballotNumber: string): Promise<any> {
    return this.http.get(this.endPoint + '/exists', this.getTokenRequest({ ballotNumber }, true))
      .toPromise()
      .then(response => response)
      .catch(() => false);
  }
}
