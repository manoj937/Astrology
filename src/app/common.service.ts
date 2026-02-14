import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class commonService {

  constructor(private http: HttpClient) { }

  getConfig(url: string) {
    return this.http.get(url);
  }

}
