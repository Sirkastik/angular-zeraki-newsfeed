import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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
  private apiUrl = 'https://mock-json-server-service.herokuapp.com/activities';

  private newAct!: Activity;
  private subject = new Subject<Activity>();

  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.apiUrl, httpOptions);
  }

  getUserActivities(userName: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(
      `${this.apiUrl}/?subject=${userName}`,
      httpOptions
    );
  }

  likeActivity(activity: Activity): void {
    this.http.put<Activity>(
      `${this.apiUrl}/${activity.id}`,
      activity,
      httpOptions
    );
    const likeActivity: Activity = {
      subject: activity.likes[activity.likes.length - 1],
      action: 'liked',
      pronoun: `${activity.subject}'s`,
      object: activity.object,
      date: Date.now().toString(),
      likes: [],
      comments: [],
    };
    this.http
      .post<Activity>(this.apiUrl, likeActivity, httpOptions)
      .subscribe((activity) => {
        this.newAct = activity;
        this.subject.next(this.newAct);
      });
  }

  commentActivity(activity: Activity, comment: string): void {
    this.http.put<Activity>(
      `${this.apiUrl}/${activity.id}`,
      activity,
      httpOptions
    );
    const commentActivity: Activity = {
      subject: activity.comments[activity.comments.length - 1].user,
      action: 'commented on',
      pronoun: `${activity.subject}'s`,
      object: activity.object,
      text: comment,
      date: Date.now().toString(),
      likes: [],
      comments: [],
    };
    this.http
      .post<Activity>(this.apiUrl, commentActivity, httpOptions)
      .subscribe((activity) => {
        this.newAct = activity;
        this.subject.next(this.newAct);
      });
  }

  updateStatus(
    status: string,
    subject: { name: string; gender: string }
  ): void {
    const activity: Activity = {
      subject: subject.name,
      action: 'updated',
      pronoun: subject.gender === 'male' ? 'his' : 'her',
      object: 'status',
      text: status,
      date: Date.now().toString(),
      likes: [],
      comments: [],
    };
    this.http
      .post<Activity>(this.apiUrl, activity, httpOptions)
      .subscribe((activity) => {
        this.newAct = activity;
        this.subject.next(this.newAct);
      });
  }

  onNewActivity(): Observable<Activity> {
    return this.subject.asObservable();
  }
}
