import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../models/Activity';
import { ActivityService } from 'src/app/services/activity.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { RandomUser } from 'src/app/models/User';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  @Input() user!: RandomUser;
  activities$!: Observable<Activity[]>;
  refreshActivities$ = new BehaviorSubject<null | Activity>(null);

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.activities$ = this.refreshActivities$.pipe(
      switchMap((_) => this.activityService.getActivities()),
      map((activities: Activity[]) => {
        if (params.hasOwnProperty('user')) {
          return activities.filter(
            (activity) => activity.subject === params.user
          );
        } else return activities;
      })
    );
  }

  // *like an activity
  likeActivity(activity: Activity) {
    activity.likes.push(this.user.name.first);
    // update server
    this.activityService.likeActivity(activity)
    // update client side after server
    this.refreshActivities$.next(activity);
  }

  // *comment on an activity
  commentActivity(activity: Activity, comment: string) {
    const newComment = { user: this.user.name.first, comment: comment };
    activity.comments.push(newComment);
    // update server
    this.activityService.commentActivity(activity, comment);
    // update client side after server
    this.refreshActivities$.next(activity);
  }
}
