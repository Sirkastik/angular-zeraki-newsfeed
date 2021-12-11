import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faUsers, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { ActivityService } from 'src/app/services/activity.service';

import { RandomUser } from 'src/app/User';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css'],
})
export class StatusBarComponent implements OnInit {
  faUsers = faUsers;
  faPaperPlane = faPaperPlane;

  @Input() user!: RandomUser;

  status: string = '';

  @Output() showSB = new EventEmitter();

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {}

  updateStatus() {
    if (!this.status.match(/([^\s]+)/g)) {
      return;
    }
    this.activityService.updateStatus(this.status, {
      name: this.user.name.first,
      gender: this.user.gender,
    });
    this.status = '';
  }
}
