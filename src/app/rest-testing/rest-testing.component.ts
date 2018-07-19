import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';

interface CharData {
  data: Array<number>;
  label: string;

}

@Component({
  selector: 'app-rest-testing',
  templateUrl: './rest-testing.component.html',
  styleUrls: ['./rest-testing.component.scss']
})
export class RestTestingComponent implements OnInit, OnDestroy {

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  constructor(private api: ApiService) { }

  public lineChartData: Array<CharData> = [
    { data: [], label: 'Request time in miliseconds' },
    { data: [], label: 'Size in kilobyte' },
  ];

  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: Boolean = true;
  public lineChartType: String = 'line';

  lastResults = [];
  subscription: Subscription;



  makeTest(requestsAmount = 1, requestDB = 'aurora') {
    const requestRecords = 10;
    console.log(`req amount: ${requestsAmount} \n reqRecords: ${requestRecords} \n reqDatabase ${requestDB}`);
    const arrOfResults = [];
    this.subscription = this.api.testRequests(requestsAmount, requestRecords, requestDB).subscribe(
      result => {
        arrOfResults.push(result);
        if (arrOfResults.length === +requestsAmount) {
          this.lineChartData[0].data.push(arrOfResults[arrOfResults.length - 1].time);
          this.lineChartData[1].data.push(arrOfResults[arrOfResults.length - 1].weight * arrOfResults.length / 1024);
          this.lineChartLabels.push(arrOfResults.length + '(' + requestDB + ')');
        }
        this.chart.chart.update();
      },
      err => console.error(err),
      () => console.log('completed')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
