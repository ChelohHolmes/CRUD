import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReadService {
    private url = '/login.js';

  constructor(private http: HttpClient) { }

    post() {
        return this.http.post<any>(environment.serverUrl + this.url, null);
    }
}
