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
  dbOption = {
    database: '',
    limit: 10
  };

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;


  public lineChartData: Array<CharData> = [
    {data: [0], label: 'Request time in miliseconds'},
    {data: [1], label: 'Response size in kilobytes'},
    {data: [0], label: 'Number of records'}];

  public lineChartLabels: Array<any> = [0];
  public lineChartOptions: any = {responsive: true};
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(private api: ApiService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  onSubmit(form) {
    const o = this.dbOption;
    o.limit = o.limit > 100000 ? 100000 : o.limit;
    const start = performance.now();
    this.api.getDatabaseData(o.database, o.limit).subscribe(res => {
        const time = (performance.now() - start);
        const size = (res.headers.get('Content-Length') / 1024);
        this.changeData(time, size, o.limit, o.database);
      }, error => {
        console.log(error);
      },
    );
  }

  changeData(time, size, number, database) {
    this.lineChartData[0].data.push(time.toFixed(3));
    this.lineChartData[1].data.push(size.toFixed(3));
    this.lineChartData[2].data.push(number);
    const db = database === 'dynamo' ? 'DynamoDB' : 'Aurora';
    this.lineChartLabels.push(this.lineChartData[0].data.length - 1 + ' - ' + db);
    this.chart.chart.update();
  }

  clearData() {
    const chart = this.chart.chart;
    const l = this.lineChartLabels.length;
    chart.data.labels.splice(1, l);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.splice(1, l);
    });
    chart.update();
  }

}
