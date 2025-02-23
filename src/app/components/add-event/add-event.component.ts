import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../services/call-api.service';
import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  constructor(
    private callApiService: CallApiService,
    private UtilService: UtilService,
    private router: Router
  ) {}
  addEventForm!: FormGroup;
  passwordVisible = false;
  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initialize form
   */
  initForm() {
    this.addEventForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      availableSeats: new FormControl('', [Validators.required]),
    });
  }

  onAddEventRequest() {
    const { title, description, location, date, price, availableSeats } =
      this.addEventForm.value;
    this.callApiService
      .addEvent({
        title,
        description,
        location,
        date,
        price,
        availableSeats,
      })
      .subscribe({
        next: (res: any) => {
          debugger;
          this.UtilService.openSnackBar(res?.message);
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          this.UtilService.openSnackBar(
            error?.body?.message || error?.body?.error
          );
        },
      });
  }
}
