import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../Activity';
import { ActivityService } from 'src/app/services/activity.service';
import { Subscription } from 'rxjs';
import { RandomUser } from 'src/app/User';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  @Input() user!: RandomUser;
  activities: Activity[] = [];
  subscription!: Subscription;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) {
    // *subscribe to any changes made to the activities
    this.subscription = this.activityService
      .onNewActivity()
      .subscribe((activity) => {
        // *add new activity if you're in the home route
        if (this.route.snapshot.routeConfig?.path !== 'user-feed/:user') {
          this.activities.unshift(activity);
        }
      });
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    if (params.hasOwnProperty('user')) {
      this.activityService
        .getUserActivities(params.user)
        .subscribe((activities) => (this.activities = activities));
    } else {
      this.activityService
        .getActivities()
        .subscribe((activities) => (this.activities = activities.reverse()));
    }
  }

  // *like an activity
  likeActivity(activity: Activity) {
    const likedActivity = activity;
    likedActivity.likes.push(this.user.name.first);
    // update server
    this.activityService.likeActivity(likedActivity);
    // update client side after server
    activity.likes.push(this.user.name.first);
  }

  // *comment on an activity
  commentActivity(activity: Activity, comment: string) {
    const commentedActivity = activity;
    const newComment = { user: this.user.name.first, comment: comment };
    commentedActivity.comments.push(newComment);
    // update server
    this.activityService.commentActivity(commentedActivity, comment);
    // update client side after server
    activity.comments.push(newComment);
  }
}
