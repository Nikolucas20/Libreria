import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  Url="http://127.0.0.1:8000/api/library";
  constructor(public api: HttpClient) { }
  
  public getdata(): Observable<any> {
    return this.api.get(this.Url);
    
  }

  public postdata(data: any): Observable<any> {
    return this.api.post(this.Url, data);
  }

  public putdata(id: number, data: any): Observable<any> {
    return this.api.put(`${this.Url}/${id}`, data);
  }

  public deletedata(id: number): Observable<any> {
    return this.api.delete(`${this.Url}/${id}`);
  }
}
