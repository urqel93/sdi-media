import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JSON_API, USERS} from './routes';
import {Observable, timer} from 'rxjs';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  headers = new HttpHeaders({'Content-Type': 'application/json'});
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

  getImage(url: string): Observable<SafeUrl> {

    let start_time = performance.now();
    return this.http.get(url, {responseType: 'blob'}).pipe(map(response => {
      this.setTime(performance.now() - start_time);
      this.setSize(response.size);
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response));
    }));
  }

  getRegion(): Observable<any> {
    return this.http.get(window.location.href + '/region.json', {headers: this.headers});
  }
}
