import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://04wr9sgpv6.execute-api.us-east-1.amazonaws.com/';
  getCourseDetails(configPayload: any) {
        console.log("service layer::::", configPayload);
        return this.http.post(`${this.baseUrl}ProCatlogApi/catalog`, configPayload);
    }
}
