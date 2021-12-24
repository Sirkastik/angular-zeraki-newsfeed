import { Component, OnInit, Input } from '@angular/core';

import { RandomUser } from 'src/app/models/User';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
})
export class FriendComponent implements OnInit {
  @Input() friend!: RandomUser;

  constructor() {}

  ngOnInit(): void {}
}
