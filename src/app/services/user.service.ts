import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// user interface from database
import { RandomUser } from '../models/User';

// Response interface from randomuser.me api
interface Response {
  info?: Object;
  results: RandomUser[];
}

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer jd7wKe3jSx4c9CcjLefw6',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://mock-json-server-service.herokuapp.com';

  constructor(private http: HttpClient) {}

  // get friends' list
  getUsers(): Observable<RandomUser[]> {
    return this.http
      .get<RandomUser[]>(`${this.apiUrl}/users`, httpOptions)
      .pipe(tap((friends) => friends.reverse()));
  }

  // get random user
  getRandomUser(): Observable<Response> {
    return this.http.get<Response>('https://randomuser.me/api');
  }
}
