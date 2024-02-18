import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from 'src/app/_shared/services/http/base-http.service';
import { DataTableResponse } from 'src/app/_shared/services/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/_shared/services/data-table/classes/data-table-criteria';
import { VoterModel } from 'src/app/_shared/models/voter.model';
import { UserSessionService } from "src/app/_shared/services/http/user-session.service";


@Injectable()
export class VoterService extends BaseHttpService {

  readonly endPoint = this.apiUrl + 'voter';

  constructor(private http: HttpClient, userSession: UserSessionService) {
    super(userSession);
  }

  getVoters(criteria: DataTableCriteria): Promise<DataTableResponse> {
    const params = this.getDataTableParams(criteria);

    // @ts-ignore
    return this.http.post(this.endPoint + '/search', params, this.getTokenRequest(null, true))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getVoter(keyword: number): Promise<VoterModel> {
    // @ts-ignore
    return this.http.get(this.endPoint + '/' + keyword, this.getTokenRequest())
      .toPromise()
      .then(response => response as VoterModel)
      .catch(() => null);
  }

  newVoter(values: object): Promise<boolean> {
    return this.http.post(this.endPoint, values, this.getTokenRequest())
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  // @ts-ignore
  updateVoter(voterId, field): Promise<any> {
    return this.http.put(this.endPoint + '/' + voterId, field, this.getTokenRequest())
      .toPromise()
      .then(response => response)
      .catch(err => err);
  }

  multipleUpdate(checkedItems: any[], values: object): Promise<boolean> {
    return this.http.put(this.endPoint + '/multipleUpdate', { checkedItems, ...values }, this.getTokenRequest())
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteVoter(voterId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + voterId, this.getTokenRequest())
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  getStats(): Promise<any> {
    return this.http.get(this.endPoint + '/stats', this.getTokenRequest())
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  checkExists(username: string): Promise<any> {
    return this.http.get(this.endPoint + '/exists', this.getTokenRequest({ username }, true))
      .toPromise()
      .then(response => response)
      .catch(() => false);
  }
}
