import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  constructor(private http: HttpClient) {}

  // *GET
  // *Returns All Activities and sorts according to date
  // *token in httpOptions
  getActivities(): Observable<Activity[]> {
    return this.http
      .get<Activity[]>(this.apiUrl, httpOptions)
      .pipe(tap((activities) => activities.sort((a, b) => b.date - a.date)));
  }

  // *PUT & POST
  // *PUT modifies activity to add like
  // *POST Returns new like Activity
  // *token in httpOptions
  likeActivity(activity: Activity): void {
    // like
    this.http
      .put<Activity>(`${this.apiUrl}/${activity.id}`, activity, httpOptions)
      .subscribe();
    // new activity: LIKE
    const LIKE: Activity = {
      subject: activity.likes[activity.likes.length - 1],
      action: 'liked',
      pronoun: `${activity.subject}'s`,
      object: activity.object,
      date: Date.now(),
      likes: [],
      comments: [],
    };
    // new like activity
    this.http.post<Activity>(this.apiUrl, LIKE, httpOptions).subscribe();
  }

  // *PUT & POST
  // *PUT modifies activity to add comment
  // *POST Returns new comment Activity
  // *token in httpOptions
  commentActivity(activity: Activity, comment: string): void {
    // comment added
    this.http
      .put<Activity>(`${this.apiUrl}/${activity.id}`, activity, httpOptions)
      .subscribe();
    // new activity: COMMENT
    const COMMENT: Activity = {
      subject: activity.comments[activity.comments.length - 1].user,
      action: 'commented on',
      pronoun: `${activity.subject}'s`,
      object: activity.object,
      text: comment,
      date: Date.now(),
      likes: [],
      comments: [],
    };
    // new comment activity
    this.http.post<Activity>(this.apiUrl, COMMENT, httpOptions).subscribe();
  }

  // *POST
  // *Returns new addStatus Activity
  // *token in httpOptions
  updateStatus(
    status: string,
    subject: { name: string; gender: string }
  ): void {
    const ACTIVITY: Activity = {
      subject: subject.name,
      action: 'updated',
      pronoun: subject.gender === 'male' ? 'his' : 'her',
      object: 'status',
      text: status,
      date: Date.now(),
      likes: [],
      comments: [],
    };
    // Add Status
    this.http.post<Activity>(this.apiUrl, ACTIVITY, httpOptions).subscribe();
  }
}
