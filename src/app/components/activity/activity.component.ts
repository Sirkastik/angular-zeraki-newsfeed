import { Component, OnInit, Input } from '@angular/core';
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

  faThumbsUp = faThumbsUp;
  faComment = faComment;

  constructor() {}

  ngOnInit(): void {}
}
