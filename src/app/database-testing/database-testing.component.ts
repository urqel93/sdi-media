import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {ApiService} from '../api.service';

interface CharData {
  data: Array<number>;
  label: string;

}

@Component({
  selector: 'databse-testing',
  templateUrl: 'database-testing.component.html'
})

export class DatabaseTestingComponent implements OnInit, AfterViewInit {
  options = {
    database: '',
    limit: 10
  };

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

  constructor(private api: ApiService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  onSubmit(form) {
    const o = this.options;
    const start = performance.now();
    this.api.getDatabaseData(o.database, o.limit).subscribe(res => {
      this.api.setTime(performance.now() - start);
      this.api.setSize(res.size);
      console.log(res.getResponseHeader('Content-Length'));
    });
    this.changeData(this.api.getTime(), this.api.getSize());
    // form.reset();
  }

  changeData(time, size) {
    this.lineChartData[0].data.push(time.toFixed(3));
    this.lineChartData[1].data.push(size.toFixed(3));
    this.lineChartLabels.push(this.lineChartData[0].data.length - 1);
    this.chart.chart.update();
  }

}
