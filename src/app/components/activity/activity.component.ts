import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '../../models/Activity';
import {
  faUserAlt,
  faPaperPlane,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
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
  comment: string = '';
  showComments: boolean = false;

  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faUserCircle = faUserAlt;
  faPaperPlane = faPaperPlane;
  faTimes = faTimes;

  constructor() {}

  ngOnInit(): void {}

  // TODO: Generate a pipe to handle date/time/day formatting
  // *Functions to format date
  time(date: number): string {
    return new Date(date).toLocaleTimeString();
  }
  day(date: number): string {
    return new Date(date).toString().split(' ')[0];
  }
  date(date: number): string {
    return new Date(date).toString().split(' ')[2];
  }

  addComment() {
    // *Making sure the comment is not an empty string
    if (!this.comment.trim()) {
      this.comment = '';
      return;
    }
    this.onComment.emit(this.comment);
    this.comment = '';
    this.showComments = false;
  }

  hideComments(e: Event) {
    // *Allow closing of modal from container ONLY and not it's children
    const target = document.getElementById('container');
    if (e.target === target) {
      this.showComments = false;
    }
  }
}
