import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { CustomerReservationComponent } from './customer-reservation/customer-reservation.component';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ReservaService } from '../services/reserva.service';
import { BrowserModule } from '@angular/platform-browser';
import { ValidacionGuard } from '../guards/token.guard';
import { TableFormComponent } from './table-form/table-form.component';
import { TableListComponent } from './table-list/table-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ReservationFormComponent,
    CustomerReservationComponent,
    AdminReservationComponent,
    ProfileComponent,
    TableFormComponent,
    TableListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
  ],
  providers: [ReservaService, ValidacionGuard],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PagesModule {}
