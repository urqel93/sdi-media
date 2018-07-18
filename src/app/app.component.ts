import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from './api.service';
import {Classes} from './classes';
import {SafeUrl} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs';
import {BaseChartDirective} from 'ng2-charts';
import User = Classes.User;

interface CharData {
  data: Array<number>;
  label: string;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;


  public lineChartData: Array<CharData> = [
    {data: [0], label: 'Request time in miliseconds'},
    {data: [1], label: 'Response size in kilobytes'}];

  public lineChartLabels: Array<any> = [0];
  public lineChartOptions: any = {responsive: true};
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  users: User[] = new Array<User>();
  imgSrc: BehaviorSubject<SafeUrl>;
  region: string;

  constructor(private api: ApiService) {

  }

  ngOnInit() {
    // this.getAllUsers();
    this.imgSrc = new BehaviorSubject('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
  }

  ngAfterViewInit() {
    this.getAppRegion();
    this.getImage();
  }

  getAllUsers() {
    this.api.getUsers().subscribe(res =>
        res.forEach(data => {
          this.users.push(User.create(data));
        })
      , err => console.log(err));
  }

  getImage() {
    this.api.getImage('https://picsum.photos/500/500/?random').subscribe(imgUrl => {
      this.imgSrc.next(imgUrl);
      this.changeData(this.api.getTime(), this.api.getSize());
    });
  }

  changeData(time, size) {
    this.lineChartData[0].data.push(time.toFixed(3));
    this.lineChartData[1].data.push(size.toFixed(3));
    this.lineChartLabels.push(this.lineChartData[0].data.length - 1);
    this.chart.chart.update();
  }

  getAppRegion() {
    this.api.getRegion()
      .subscribe(res => {
        this.region = res;
      });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
