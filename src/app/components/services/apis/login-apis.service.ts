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
export class LoginInMemoryAuthService implements InMemoryDbService {
  createDb() {
    const login = [
      {
        id: 1,
        username: 'admin',
        password: 'admin123',
        token: 'admin-token',
      },
      {
        id: 2,
        username: 'user',
        password: 'user123',
        token: 'user-token',
      },
    ];
    return { login };
  }

  authenticate(reqInfo: RequestInfo) {
    const body = reqInfo.utils.getJsonBody(reqInfo.req);
    const users = reqInfo.collection as any[];
    const user = users.find(
      (u) => u.username === body.username && u.password === body.password
    );

    const response: ResponseOptions = user
      ? {
          status: STATUS.OK,
          body: { message: 'Login successful', token: user.token },
        }
      : {
          status: STATUS.UNAUTHORIZED,
          body: { message: 'Invalid credentials' },
        };

    return reqInfo.utils.createResponse$(() => response);
  }
}
