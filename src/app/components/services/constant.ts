import { BehaviorSubject } from 'rxjs';

export const loginSubject: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(false);
