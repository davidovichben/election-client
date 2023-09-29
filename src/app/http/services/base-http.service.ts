import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';


import { DataTableCriteria } from 'src/app/services/data-table/classes/data-table-criteria';
import {UserSessionService} from "./user-session.service";

@Injectable()
export abstract class BaseHttpService {

  // readonly apiUrl = 'http://18.156.130.243/api/';
  readonly apiUrl = 'http://localhost:8000/api/';

  protected constructor(protected userSession?: UserSessionService) {}

  getTokenRequest(params?: any, noLoader?: boolean): { headers: HttpHeaders, params?: HttpParams } {
    const request: { headers: HttpHeaders, params?: HttpParams } = { headers: this.getTokenHeaders(noLoader) };

    if (params) {
      request.params = new HttpParams({ fromObject: params } );
    }

    return request;
  }

  getTokenHeaders(noLoader?: boolean): HttpHeaders {
    const headers = {
      // @ts-ignore
      Authorization: 'Bearer ' + this.userSession.getToken()
    };

    if (noLoader) {
      Object.assign(headers, { NoLoader: 'true' });
    }

    return new HttpHeaders(headers);
  }

  getBlobRequest(params?: any): { headers: HttpHeaders, responseType: 'blob' } {
    const request: { headers: HttpHeaders, responseType: 'blob', params?: HttpParams } = {
      headers: this.getTokenHeaders(),
      responseType: 'blob'
    };

    if (params) {
      request.params = new HttpParams({ fromObject: params } );
    }

    return request;
  }

  getDataTableParams(criteria: DataTableCriteria, params?: object): object {
    const formattedParams = {
      ...criteria.filters,
      ...params,
      sortBy: criteria.sort.column,
      sortDir: criteria.sort.direction,
      page: criteria.page,
      keyword: '',
      isCheckAll: false
    };

    if (criteria.keyword) {
      formattedParams.keyword = criteria.keyword;
    }

    if (criteria.isCheckAll) {
      formattedParams.isCheckAll = criteria.isCheckAll;
    }

    return formattedParams;
  }
}
