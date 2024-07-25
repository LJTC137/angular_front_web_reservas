import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Reserva as ReservaModel } from 'src/app/models/reservacion.model';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.scss'],
})
export class AdminReservationComponent implements OnInit {
  adminReservationList: ReservaModel[] = [];

  eliminateId: number = 0;

  constructor(
    private reservaService: ReservaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllReservations();
  }

  //Funcion getListAllReservations
  private async getAllReservations() {
    this.reservaService.getListReserva().subscribe({
      next: (data: ReservaModel[]) => {
        this.adminReservationList = data;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  setEliminateReserva(reserva: ReservaModel) {
    this.eliminateId = reserva.id_reserva;
    console.log(this.eliminateId);
  }

  deleteReserva() {
    this.reservaService.deleteReserva(this.eliminateId).subscribe({
      next: (data) => {
        this.toastr.success('Reserva eliminada', 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
      error: (err: any) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
}
