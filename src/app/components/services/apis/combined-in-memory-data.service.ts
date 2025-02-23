import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  ResponseOptions,
  STATUS,
} from 'angular-in-memory-web-api';
import { LoginInMemoryAuthService } from './login-apis.service';
import { EventInMemoryService } from './event-apis.service';

@Injectable({
  providedIn: 'root',
})
export class CombinedInMemoryDataService implements InMemoryDbService {
  constructor(
    private loginService: LoginInMemoryAuthService,
    private eventService: EventInMemoryService
  ) {}

  createDb() {
    const loginDb = this.loginService.createDb();
    const eventDb = this.eventService.createDb();
    return { ...loginDb, ...eventDb };
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.req.url.endsWith('/login')) {
      return this.loginService.authenticate(reqInfo);
    } else if (reqInfo.req.url.endsWith('/events')) {
      return this.eventService.addEvent(reqInfo);
    }
    return undefined;
  }

  get(reqInfo: RequestInfo) {
    if (reqInfo.req.url.endsWith('/events')) {
      reqInfo.collectionName = 'events';
      reqInfo.collection = this.eventService.getEvents();
      return reqInfo.utils.createResponse$(() => ({
        status: STATUS.OK,
        body: reqInfo.collection,
      }));
    }
    return undefined;
  }

  delete(reqInfo: RequestInfo) {
    if (reqInfo.req.url.includes('/events/')) {
      return this.eventService.deleteEvent(reqInfo);
    }
    return undefined;
  }
}
