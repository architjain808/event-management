import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  ResponseOptions,
  STATUS,
} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class EventInMemoryService implements InMemoryDbService {
  private events = [
    {
      id: 1,
      title: 'Music Concert',
      description: 'A live music concert featuring top artists.',
      location: 'City Hall, New York',
      date: '2025-03-15',
      price: 50,
      availableSeats: 200,
    },
    {
      id: 2,
      title: 'Tech Conference',
      description: 'Annual tech conference with keynote speakers.',
      location: 'Silicon Valley, CA',
      date: '2025-04-20',
      price: 100,
      availableSeats: 500,
    },
    {
      id: 3,
      title: 'Musical Night',
      description: 'A musical night with live performances.',
      location: 'open-air theatre, Central Park',
      date: '2025-04-20',
      price: 150,
      availableSeats: 500,
    },
    {
      id: 4,
      title: 'Pottery Workshop',
      description: 'Workshop on pottery making and techniques.',
      location: 'Silicon Valley, CA',
      date: '2025-04-20',
      price: 10,
      availableSeats: 100,
    },
    {
      id: 5,
      title: 'Angular Conference',
      description: 'Meet the Angular team and learn about the latest features.',
      location: 'Silicon Valley, CA',
      date: '2025-04-20',
      price: 200,
      availableSeats: 500,
    },
    {
      id: 6,
      title: 'Music Concert',
      description: 'A live music concert featuring top artists.',
      location: 'Silicon Valley, CA',
      date: '2025-04-20',
      price: 200,
      availableSeats: 500,
    },
  ];

  createDb() {
    return { events: this.events };
  }

  addEvent(reqInfo: RequestInfo) {
    const body = reqInfo.utils.getJsonBody(reqInfo.req);
    const newEvent = { ...body, id: this.events.length + 1 };
    this.events.push(newEvent);

    const response: ResponseOptions = {
      status: STATUS.CREATED,
      body: { message: 'Event added successfully', event: newEvent },
    };
    return reqInfo.utils.createResponse$(() => response);
  }

  getEvents() {
    return this.events;
  }

  deleteEvent(reqInfo: RequestInfo) {
    const id = parseInt(reqInfo.id, 10);
    const index = this.events.findIndex((event) => event.id === id);
    if (index !== -1) {
      this.events.splice(index, 1);
      const response: ResponseOptions = {
        status: STATUS.OK,
        body: { message: 'Event deleted successfully' },
      };
      return reqInfo.utils.createResponse$(() => response);
    } else {
      const response: ResponseOptions = {
        status: STATUS.NOT_FOUND,
        body: { message: 'Event not found' },
      };
      return reqInfo.utils.createResponse$(() => response);
    }
  }
}
