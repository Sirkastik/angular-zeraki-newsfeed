import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RandomUser } from 'src/app/models/User';
import { faUsers, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() hideSB = new EventEmitter();
  faUsers = faUsers;
  faTimes = faTimes;
  friends$!: Observable<RandomUser[]>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.friends$ = this.userService.getUsers();
  }
}