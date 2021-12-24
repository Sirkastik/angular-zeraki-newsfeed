import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RandomUser } from 'src/app/models/User';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css'],
})
export class UserFeedComponent implements OnInit {
  user!: RandomUser;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.userService
      .getRandomUser()
      .subscribe((res) => (this.user = res.results[0]));
  }
  userName() {
    return this.route.snapshot.params.user;
  }
}
