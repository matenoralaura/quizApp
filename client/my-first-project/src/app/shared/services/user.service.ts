import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = '/app';

  getAll() {
    return this.http.get<User[]>(this.baseUrl + '/getAllUsers', {withCredentials: true});
  }

  patch(userId: string): Observable<any> {
    const url = `/app/users/${userId}/points`;

    return this.http.patch(url, { withCredentials: true });
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + '/deleteUser?id=' + id, {withCredentials: true});
  }
}
