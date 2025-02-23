import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/common/home/home.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { BookedPageComponent } from './components/common/booked-page/booked-page.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'add-event',
    canActivate: [LoginGuard],
    component: AddEventComponent,
  },
  {
    path: 'booked',
    canActivate: [LoginGuard],
    component: BookedPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
