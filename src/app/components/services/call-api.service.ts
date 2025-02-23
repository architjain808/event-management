import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'src/app/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class CallApiService {
  private loginUrl = 'api/login';
  private eventUrl = 'api/events';
  constructor(private readonly http: HttpClient) {}

  /**
   * login user
   * @param username
   * @param password
   */
  loginUser(username: string, password: string) {
    return this.http.post(this.loginUrl, { username, password });
  }

  getEvents() {
    return this.http.get(this.eventUrl);
  }

  addEvent(eventObj: Events) {
    return this.http.post(this.eventUrl, eventObj);
  }

  deleteEvent(id: number) {
    return this.http.delete(`${this.eventUrl}/${id}`);
  }
}
