import { Component, OnInit, ViewChild } from '@angular/core';
import { AppURLs } from '../AppURLs';
import { ApiService } from '../api.service';
import { BaseChartDirective } from 'ng2-charts';

interface CharData {
  data: Array<number>;
  label: string;

}

@Component({
  selector: 'app-rest-testing',
  templateUrl: './rest-testing.component.html',
  styleUrls: ['./rest-testing.component.scss']
})
export class RestTestingComponent implements OnInit {

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  constructor(private api: ApiService) { }

  public lineChartData: Array<CharData> = [
    { data: [], label: 'Request time in miliseconds' }];

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


  makeTest(requestsAmount) {
    console.log(requestsAmount);
    this.api.testRequests(AppURLs.TEST_URL, requestsAmount).subscribe(result => {
      console.log(result);
      this.lineChartData[0].data.push(+result);
      this.lineChartLabels.push(this.lineChartLabels.length + 1);
      this.chart.chart.update();
    });
  }

  ngOnInit() {
  }

}
