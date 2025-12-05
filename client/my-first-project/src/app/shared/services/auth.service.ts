import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = '/app'; 

  constructor(private http: HttpClient) { }

  // login
  login(email: string, password: string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.baseUrl + '/login', body, {headers: headers, withCredentials: true});
  }

  register(user: User) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('name', user.name);
    body.set('address', user.address);
    body.set('nickname', user.nickname);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.baseUrl + '/register', body, {headers: headers});
  }

  logout() {
    return this.http.post(this.baseUrl + '/logout', {}, {withCredentials: true, responseType: 'text'});
  }

  checkAuth() {
    return this.http.get<boolean>(this.baseUrl + '/checkAuth', {withCredentials: true});
  }

  checkAdmin() {
    return this.http.get<boolean>(this.baseUrl + '/currentUserRole', {withCredentials: true});
  }

  addPoint() {
    return this.http.patch(this.baseUrl + '/updatePoints', {}, {withCredentials: true});
  }
}