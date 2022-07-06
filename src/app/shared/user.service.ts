import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';

// import { Http, Headers, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  noAuthHeader = { headers: new HttpHeaders({ 'Authorization': 'True'})};

  constructor(private http: HttpClient) { } 

  login(auth: any) {
    return this.http.post(environment.apiBaseUrl + 'account/login', auth);
  }

   // Token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }

  checkToken(token: string) {

  }
  
  getData (token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    })

    return this.http.get(environment.apiBaseUrl + 'dashboard', { headers: headers })
  } 






}
