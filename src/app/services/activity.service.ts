import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Activity } from '../Activity';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer jd7wKe3jSx4c9CcjLefw6',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private apiUrl = 'https://mock-json-server-service.herokuapp.com';

  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/activities`, httpOptions);
  }

  getUserActivities(userName: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(
      `${this.apiUrl}/activities/?subject=${userName}`,
      httpOptions
    );
  }

  updateStatus(status: string, subject: string) {
    const activity: Activity = {
      subject: subject,
      action: 'updated',
      pronoun: 'thier',
      object: 'status',
      text: status,
      date: Date.now().toString(),
      likes: [],
      comments: [],
    };
    return this.http.post<Activity[]>(
      `${this.apiUrl}/activities`,
      activity,
      httpOptions
    );
  }
}
