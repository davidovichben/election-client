import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';
import {DataTableResponse} from "../../services/data-table/classes/data-table-response";
import {DataTableCriteria} from "../../services/data-table/classes/data-table-criteria";
import {UserModel} from "../../models/user.model";
import {UserSessionService} from "./user-session.service";


@Injectable()
export class UserService extends BaseHttpService {

  readonly endPoint = this.apiUrl + 'user';

  constructor(private http: HttpClient, userSession: UserSessionService) {
    super(userSession);
  }

  getUsers(criteria: DataTableCriteria): Promise<DataTableResponse> {
    const params = this.getDataTableParams(criteria);

    // @ts-ignore
    return this.http.post(this.endPoint + '/search', params, this.getTokenRequest(null, true))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getUser(userId: number): Promise<UserModel> {
    // @ts-ignore
    return this.http.get(this.endPoint + '/' + userId, this.getTokenRequest())
      .toPromise()
      .then(response => response as UserModel)
      .catch(() => null);
  }

  newUser(values: object): Promise<boolean> {
    return this.http.post(this.endPoint, values, this.getTokenRequest())
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  // @ts-ignore
  updateUser(userId, field): Promise<any> {
    return this.http.put(this.endPoint + '/' + userId, field, this.getTokenRequest())
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

  deleteUser(userId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + userId, this.getTokenRequest())
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
