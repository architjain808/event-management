import { Component, OnDestroy, OnInit } from '@angular/core';
import { CallApiService } from '../../services/call-api.service';
import { UtilService } from '../../services/util.service';
import { Events } from 'src/app/models/event.model';
import { loginSubject } from '../../services/constant';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  eventList!: Events[];
  priceOptions: string[] = ['All', 'Below $50', 'Below $100', 'Above $100'];
  selectedPrice: string = 'All';
  searchQuery: string = '';
  isAdmin!: boolean;
  loginSub!: Subscription;
  constructor(
    private readonly callApiServivce: CallApiService,
    private readonly utilService: UtilService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginSub = loginSubject.subscribe(() => {
      const user = localStorage.getItem('userData');
      if (user) {
        this.isAdmin = JSON.parse(user).token == 'admin-token';
      } else {
        this.isAdmin = false;
      }
    });
    this.getEvents();
  }

  getEvents() {
    this.callApiServivce.getEvents().subscribe({
      next: (res: any) => {
        this.eventList = res;
      },
      error: (error) => {
        debugger;
        this.utilService.openSnackBar(error?.body?.message);
      },
    });
  }

  filteredEvents() {
    return this.eventList?.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.description
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());

      const matchesPrice =
        this.selectedPrice === 'All' ||
        (this.selectedPrice === 'Below $50' && event.price < 50) ||
        (this.selectedPrice === 'Below $100' && event.price < 100) ||
        (this.selectedPrice === 'Above $100' && event.price > 100);

      return matchesSearch && matchesPrice;
    });
  }

  deleteEvent(event: Events) {
    this.callApiServivce.deleteEvent(event.id ?? 0).subscribe({
      next: (res: any) => {
        this.utilService.openSnackBar(res?.message);
        this.eventList = this.eventList.filter((eve) => eve.id !== event.id);
      },
      error: (error) => {
        debugger;
        this.utilService.openSnackBar(error?.body?.message);
      },
    });
  }

  bookEvent(event: any) {
    this.router.navigate(['/booked'], {
      state: { eventData: event },
    });
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}
