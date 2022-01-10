import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  currentUser = new BehaviorSubject(this.isLogin);

  set isLogin(value: User | null) {
    this.currentUser.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('isLogin', JSON.stringify(value));
  }

  get isLogin() {
    return JSON.parse(localStorage.getItem('isLogin') ?? 'null');
  }
}
