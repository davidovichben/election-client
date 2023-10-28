import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {BaseHttpService} from "src/app/_shared/services/http/base-http.service";
import {UserSessionService} from "src/app/_shared/services/http/user-session.service";

@Injectable()
export class VoterFileService extends BaseHttpService {

  readonly endPoint = this.apiUrl + 'voter';

  constructor(private http: HttpClient, private userSessionService: UserSessionService) {
    super(userSessionService);
  }

  getVoterFiles(voterId: number): Promise<any[]> {
    // @ts-ignore
    return this.http.get(this.endPoint, this.getTokenRequest({ voterId }))
      .toPromise()
      .then(response => response as any[])
      .catch(() => null);
  }

  exportVotersExcel(): Promise<File|null> {
    return this.http.get(this.endPoint + '/export', this.getBlobRequest())
      .toPromise()
      .then(response => response as File)
      .catch(() => null);
  }

  uploadVoterFile(file: File, values: object): Promise<boolean> {
    const formData = new FormData();
    formData.append('values', JSON.stringify(values));
    formData.append('file', file);

    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    const options = { headers };

    return this.http
      .post(this.endPoint + '/upload', formData, this.getBlobRequest())
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteVoterFile(fileId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + fileId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}
