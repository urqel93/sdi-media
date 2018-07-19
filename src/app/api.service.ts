import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URL, DATABASE, JSON_API, LIMIT, USERS} from './routes';
import {Observable, Subject} from 'rxjs';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Expose-Headers': 'Content-Length'});
  time: number;
  size: number;

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) {

  }

  getUsers(): Observable<any> {
    return this.http.get(JSON_API + USERS, {headers: this.headers});
  }

  setTime(time?: number) {
    this.time = 0;
    this.time = time;

  }

  getTime(): number {
    return this.time;
  }

  setSize(size: number) {
    this.size = 0;
    this.size = size;
  }

  getSize(): number {
    return (this.size / 1024);
  }

  testRequests(numOfRequests, numOfRecords, db): Subject<any> {

    const subject = new Subject();

    for (let i = 1; i <= numOfRequests; i++) {
      const start_time = performance.now();
      this.http.get(BASE_URL + DATABASE + db + LIMIT + numOfRecords, {observe: 'response'}).subscribe((response) => {
        console.log();
        subject.next({
          time: performance.now() - start_time,
          weight: response.headers.get('Content-Length')
        });
      });
    }

    return subject;

  }

  getImage(url: string): Observable<SafeUrl> {

    let start_time = performance.now();
    return this.http.get(url, {responseType: 'blob'}).pipe(map(response => {
      this.setTime(performance.now() - start_time);
      this.setSize(response.size);
      console.log(response);
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response));
    }));
  }

  getRegion(): Observable<any> {
    return this.http.get(window.location.href + '/region.json', {headers: this.headers});
  }

  getDatabaseData(db: string, limit: number): Observable<any> {
    return this.http.get(BASE_URL + DATABASE + db + LIMIT + limit, {headers: this.headers, observe: 'response'});
  }
}
