import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URL, DATABASE, LIMIT} from './routes';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Expose-Headers': 'Content-Length'});

  constructor(private http: HttpClient) {

  }

  testRequests(numOfRequests, numOfRecords, db): Subject<any> {

    const subject = new Subject();

    for (let i = 1; i <= numOfRequests; i++) {
      const start_time = performance.now();
      this.http.get(BASE_URL + DATABASE + db + LIMIT + numOfRecords, {
        observe: 'response'
      })
        .subscribe((response) => {
          subject.next({
            time: performance.now() - start_time,
            weight: response.headers.get('Content-Length')
          });
        },
          err => {
            if (err.status !== 200) { subject.next(null); }
          }
        );
    }

    return subject;

  }


  getRegion(): Observable<any> {
    return this.http.get(window.location.href + '/region.json', {headers: this.headers});
  }

  getDatabaseData(db: string, limit: number): Observable<any> {
    return this.http.get(BASE_URL + DATABASE + db + LIMIT + limit, {headers: this.headers, observe: 'response'});
  }
}
