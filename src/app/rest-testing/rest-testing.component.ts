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
    { data: [0], label: 'Request time in miliseconds' },
    { data: [0], label: 'Response size in kilobytes' },
  ];

  public lineChartLabels: Array<any> = [0];
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
  public lineChartLegend: Boolean = true;
  public lineChartType: String = 'line';

  subscription: Subscription;
  numOfRequests = 50;
  clearData() {
    this.lineChartData[0].data = [0];
    this.lineChartData[1].data = [0];
    this.lineChartLabels = [0];
  }

  makeTest(requestsAmount = 1, requestDB = 'aurora') {
    const arrOfResults = [];
    this.subscription = this.api.testRequests(requestsAmount, 5, requestDB).subscribe(
      result => {
        arrOfResults.push(result);
        if (arrOfResults.length === +requestsAmount) {
          this.lineChartData[0].data.push(arrOfResults[arrOfResults.length - 1].time);
          this.lineChartData[1].data.push(arrOfResults[arrOfResults.length - 1].weight * arrOfResults.length / 1024);
          this.lineChartLabels.push(arrOfResults.length + ' - ' + (requestDB === 'aurora' ? 'Aurora' : 'DynamoDB'));
          this.chart.chart.update();
        }
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
