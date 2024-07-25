import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from 'src/app/models/reservacion.model';
import { ReservaService } from 'src/app/services/reserva.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-customer-reservation',
  templateUrl: './customer-reservation.component.html',
  styleUrls: ['./customer-reservation.component.scss'],
})
export class CustomerReservationComponent implements OnInit {
  id_usuario: any;
  customerReservationList: Reserva[] = [];

  constructor(
    private router: Router,
    private reservaService: ReservaService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.id_usuario = this.tokenService.getIdUser() ?? 0;
    this.getAllReservations(this.id_usuario);

    
  }

  navegarAReservationForm() {
    this.router.navigate(['/reservationForm']);
  }

  //Funcion getListAllReservations
  private async getAllReservations(usuario: number) {
    this.reservaService.getListUserReserva(usuario).subscribe({
      next: (data: Reserva[]) => {
        this.customerReservationList = data;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}
