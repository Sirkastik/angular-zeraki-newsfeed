import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css'],
})
export class UserFeedComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {}
  userName() {
    return this.route.snapshot.params.user
  }
}
