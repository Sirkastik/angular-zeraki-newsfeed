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
    this.subscription = this.activityService
      .onNewActivity()
      .subscribe((activity) => this.activities.unshift(activity));
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

  likeActivity(activity: Activity) {
    activity.likes.push(this.user.name.first);
    this.activityService.likeActivity(activity);
  }

  commentActivity(activity: Activity, comment: string) {
    const newComment = {
      user: this.user.name.first,
      comment: comment,
    };
    activity.comments.push(newComment);
    this.activityService.commentActivity(activity, comment);
  }
}
