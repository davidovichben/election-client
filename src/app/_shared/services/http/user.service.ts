import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseHttpService } from 'src/app/_shared/services/http/base-http.service';
import { UserSessionService } from "src/app/_shared/services/http/user-session.service";

import { DataTableResponse } from 'src/app/_shared/services/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/_shared/services/data-table/classes/data-table-criteria';
import { UserModel } from 'src/app/_shared/models/User.model';


@Injectable()
export class UserService extends BaseHttpService {

  readonly endPoint = this.apiUrl + 'user';

  constructor(private http: HttpClient, userSession: UserSessionService) {
    super(userSession);
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.http.post(`${this.endPoint}/login`, body);
  }

  newUser(user: any): Observable<any> {
    return this.http.post(`${this.endPoint}`, user, this.getTokenRequest(null, true));
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

  // @ts-ignore
  updateUser(userId, field): Promise<any> {
    return this.http.put(this.endPoint + '/' + userId, field, this.getTokenRequest())
      .toPromise()
      .then(response => response)
      .catch(() => false);
  }

  deleteUser(userId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + userId, this.getTokenRequest())
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  checkExists(username: string): Promise<any> {
    return this.http.get(this.endPoint + '/exists', this.getTokenRequest({ username }, true))
      .toPromise()
      .then(response => response)
      .catch(() => false);
  }
}
