import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '../../Activity';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';

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

  constructor() {}

  ngOnInit(): void {}
}
