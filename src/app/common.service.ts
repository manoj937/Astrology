import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class commonService {

  constructor(private http: HttpClient) { }

  getConfig(luckyNames) {
    return this.http.get(luckyNames);
  }

}
