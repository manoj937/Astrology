import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LuckynamesService {

  constructor(private http: HttpClient) { }

  luckyNames = 'assets/data.json';

  getConfig() {
    return this.http.get(this.luckyNames);
  }

}
