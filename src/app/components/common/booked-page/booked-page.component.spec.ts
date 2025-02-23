import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedPageComponent } from './booked-page.component';

describe('BookedPageComponent', () => {
  let component: BookedPageComponent;
  let fixture: ComponentFixture<BookedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookedPageComponent]
    });
    fixture = TestBed.createComponent(BookedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
