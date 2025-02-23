import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booked-page',
  templateUrl: './booked-page.component.html',
  styleUrls: ['./booked-page.component.scss'],
})
export class BookedPageComponent implements OnInit {
  constructor(private router: Router) {}
  eventDate: string = '2025-04-20';
  eventLocation: string = 'Silicon Valley, CA';

  ngOnInit(): void {
    const data = history.state.eventData;
    if (!data) this.gotoHome();
    this.eventDate = data.date;
    this.eventLocation = data.location;
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }
}
