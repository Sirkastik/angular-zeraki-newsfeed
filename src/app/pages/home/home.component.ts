import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  showSidebar: boolean = false;

  constructor(private window:Window) { }

  ngOnInit(): void {
  }

  hideMain() {
    return this.showSidebar && this.window.innerWidth <= 600
  }
}
