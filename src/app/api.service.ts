import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = '';
  public headers: HttpHeaders;

  constructor(private http: HttpClient){
    this.headers = new HttpHeaders();
    this.headers.set('', '');
  }

  getParams(data: any) {
    let query = new HttpParams();
    if (data instanceof Object && (data instanceof Array) === false) {
      if (Object.keys(data).length > 0) {
        for (let key in data) {
          if (data[key] instanceof Object && (data[key] instanceof Array) === false && data[key] instanceof File === false) {
            for (let nKey in data[key]) {
              query = query.append(`${key}[${nKey}]`, data[key][nKey]);
            }
          }
          else if ((data[key] instanceof Array) === true && data[key] instanceof File === false) {
            for (let i in data[key]) {
              query = query.append(`${key}[${i}]`, data[key][i]);
            }
          }
          else {
            query = query.set(key, data[key]);
          }
        }
      }
    }
    console.log(query);

    return query;
  }

  getData(params?: any): Observable<any> {
    return this.http.get<any>(this.apiUrl, { params: this.getParams(params) });
  }
}
