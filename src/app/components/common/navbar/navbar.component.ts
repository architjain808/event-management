import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginSubject } from '../../services/constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  username = '';
  isAdmin = false;
  loginSub!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loginSub = loginSubject.subscribe(() => {
      const user = localStorage.getItem('userData');
      if (user) {
        this.isLoggedIn = true;
        this.username = JSON.parse(user).username;
        this.isAdmin = JSON.parse(user).token == 'admin-token';
      }
    });
  }

  logout() {
    localStorage.removeItem('userData');
    this.isLoggedIn = false;
    this.username = '';
    this.isAdmin = false;
    loginSubject.next(false);
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  gotoAddPage() {
    this.router.navigate(['/add-event']);
  }
}
