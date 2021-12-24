import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RandomUser } from 'src/app/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showSidebar: boolean = false;
  user!: RandomUser;

  constructor(private userService: UserService, private window: Window) {}

  ngOnInit(): void {
    // get random users from api
    this.userService
      .getRandomUser()
      .subscribe((res) => (this.user = res.results[0]));
  }

  hideMain() {
    return this.showSidebar && this.window.innerWidth <= 600;
  }
}
