import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
HttpClient;
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import {LinkRequest, LinkResponse} from '../models/link.model';


@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  encurtarLink(data: LinkRequest): Observable<LinkResponse> {
    return this.http.post<LinkResponse>(`${this.apiUrl}/encurtar`, data);
  }
}
