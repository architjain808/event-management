import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './components/common/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { CombinedInMemoryDataService } from './components/services/apis/combined-in-memory-data.service';
import { AddEventComponent } from './components/add-event/add-event.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, NavbarComponent, AddEventComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(CombinedInMemoryDataService, {
      delay: 500,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
