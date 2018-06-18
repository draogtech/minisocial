import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {
  messages = [];
  users = [];
  path = environment.path;
  constructor( private http: HttpClient) {
  }

  getUsers() {
    this.http.get<any>(this.path + '/users').subscribe(res => {
      this.users = res;
    });
  }

  getProfile(id) {
    return this.http.get<any>(this.path + '/profile/' + id);
  }

  getMessage(userId) {
    this.http.get<any>(this.path + '/posts/' + userId).subscribe(res => {
      this.messages = res;
    });
  }

  postMessage(message) {
    this.http.post<any>(this.path + '/post', message).subscribe(res => {});
  }

}
