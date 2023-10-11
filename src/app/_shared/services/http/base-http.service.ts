import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';


import { DataTableCriteria } from 'src/app/_shared/services/data-table/classes/data-table-criteria';
import {UserSessionService} from 'src/app/_shared/services/http/user-session.service';
import { environment } from 'src/environment/environment';
// import { environment } from 'src/environment/environment.prod';


@Injectable()
export abstract class BaseHttpService {

  readonly apiUrl = environment.apiUrl;

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
      // sortBy: criteria.sort.column,
      // sortDir: criteria.sort.direction,
      sorts: criteria.sort,
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
