import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../Activity';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[] = [];

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const params = this.route.snapshot.params;
    if (params.hasOwnProperty('user')) {
      this.activityService
        .getUserActivities(params.user)
        .subscribe((activities) => (this.activities = activities));
    } else {
      this.activityService
        .getActivities()
        .subscribe(
          (activities) =>
            (this.activities = activities.sort(
              (a, b) => parseInt(b.date) - parseInt(a.date)
            ))
        );
    }
  }
}
