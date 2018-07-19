import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  region: string;

  constructor(private api: ApiService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getAppRegion();
  }

  getAppRegion() {
    this.api.getRegion().subscribe(res => {
      this.region = res;
    });
  }

}
