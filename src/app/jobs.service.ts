import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('https://demo4776583.mockable.io/jobs');
  }

  getOne(id) {
    return this.http.get(`https://demo4776583.mockable.io/job/${id}`);
  }
}
