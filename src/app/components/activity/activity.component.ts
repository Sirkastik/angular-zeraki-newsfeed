import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '../../Activity';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faComment, faThumbsUp } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {
  @Input() activity!: Activity;
  @Output() onLike = new EventEmitter();
  @Output() onComment = new EventEmitter();
  comment: string = 'new comment';

  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faUserCircle = faUserAlt;

  constructor() {}

  ngOnInit(): void {}

  time(date: number): string {
    return new Date(date).toLocaleTimeString()
  }

  day(date: number): string {
    return new Date(date).toString().split(" ")[0]
  }

  date(date: number): string {
    return new Date(date).toString().split(" ")[2]
  }
}
