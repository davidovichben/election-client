import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {BaseHttpService} from "./base-http.service";
import {UserSessionService} from "./user-session.service";

@Injectable()
export class ClientFileService extends BaseHttpService {

  readonly endPoint = this.apiUrl + 'user/upload';

  constructor(private http: HttpClient, private userSessionService: UserSessionService) {
    super(userSessionService);
  }

  getClientFiles(clientId: number): Promise<any[]> {
    // @ts-ignore
    return this.http.get(this.endPoint, this.getTokenRequest({ clientId }))
      .toPromise()
      .then(response => response as any[])
      .catch(() => null);
  }

  downloadClientFile(fileId: number): Promise<File> {
    // @ts-ignore
    return this.http.get(this.endPoint + '/' + fileId, this.getBlobRequest())
      .toPromise()
      .then(response => response as File)
      .catch(() => null);
  }

  uploadClientFile(file: File, values: object): Promise<boolean> {
    const formData = new FormData();
    formData.append('values', JSON.stringify(values));
    formData.append('file', file);

    // Define headers for the request
    const headers = new HttpHeaders({
      // Add any other required headers here
      'Content-Type': 'multipart/form-data', // Adjust the content type as needed
    });

    const options = { headers };

    return this.http
      .post(this.endPoint, formData, this.getBlobRequest())
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteClientFile(fileId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + fileId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}
