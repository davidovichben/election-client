import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from 'src/app/_shared/services/http/base-http.service';
import { UserSessionService } from "src/app/_shared/services/http/user-session.service";


@Injectable()
export class PartyService extends BaseHttpService {

  readonly endPoint = this.apiUrl + 'party';

  constructor(private http: HttpClient, userSession: UserSessionService) {
    super(userSession);
  }

  getParties(): Promise<any> {
    return this.http.get(this.endPoint, this.getTokenRequest(null, true))
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }
}
