import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faUsers,
  faPaperPlane,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

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
  faUser = faUserCircle;

  user!: RandomUser;
  status: string = ""

  @Output() showSB = new EventEmitter();

  constructor(private userService: UserService, private activityService: ActivityService) {}

  ngOnInit(): void {
    this.userService
      .getRandomUser()
      .subscribe((res) => (this.user = res.results[0]));
  }

  updateStatus() {
    this.activityService.updateStatus(this.status, this.user.name.first).subscribe((e) => {
      console.log(e)
    })
    this.status = ""
  }
}
