import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { CustomerReservationComponent } from './customer-reservation/customer-reservation.component';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { ProfileComponent } from './profile/profile.component';
import { PagesComponent } from './pages.component';
import { ValidacionGuard } from '../guards/token.guard';
import { TableListComponent } from './table-list/table-list.component';
import { TableFormComponent } from './table-form/table-form.component';

const routes: Routes = [
  {
    path: 'home',
    component: PagesComponent,
    canActivate: [ValidacionGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'reservationForm',
        component: ReservationFormComponent,
      },
      {
        path: 'customerReservation',
        component: CustomerReservationComponent,
      },
      {
        path: 'adminReservation',
        component: AdminReservationComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'tableList',
        component: TableListComponent
      },
      {
        path: 'tableForm',
        component: TableFormComponent
      }
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
