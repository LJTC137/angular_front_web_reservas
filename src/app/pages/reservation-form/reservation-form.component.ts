import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from 'src/app/models/reservacion.model';
import { TokenService } from 'src/app/services/token.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { MesaService } from 'src/app/services/mesa.service';
import { Mesa } from 'src/app/models/mesa.model';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
  reserva: Reserva = new Reserva();
  usuario: Usuario = new Usuario();
  mesasList: Mesa[] = [];
  totalReserva: number = 0;

  id_user: any;
  isEditing: boolean = false;

  constructor(
    private router: Router,
    private reservaService: ReservaService,
    private tokenService: TokenService,
    private authService: AuthService,
    private mesaService: MesaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id_user = this.tokenService.getIdUser() ?? 0;
    this.getUserById(this.id_user);
    this.getTableList().subscribe((mesasList: Mesa[]) => {
      this.mesasList = mesasList;
      if (history.state.isNew) {
        this.isEditing = true;
        this.reserva = history.state.data;
        const mesa = this.mesasList.find(
          (mesa) => mesa.id_mesa === this.reserva.mesa.id_mesa
        );

        if (mesa) {
          this.reserva.mesa = mesa;
          this.calcularTotalReserva();
        } else {
          // Maneja el caso en que no se encuentra la mesa.
        }
      } else {
        this.isEditing = false;
        this.reserva = new Reserva();
      }
    });
  }

  //==========List Table
  private getTableList(): Observable<Mesa[]> {
    return this.mesaService.getListMesa().pipe(
      tap((data: Mesa[]) => {
        this.mesasList = data;
      }),
      catchError((err: Error) => {
        console.log(err);
        return of([]);
      })
    );
  }

  //==============get user id
  private getUserById(usuario: number) {
    this.authService.getUserById(usuario).subscribe({
      next: (data: Usuario) => {
        this.usuario = data;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  //========= save reserva
  saveReserva(reserva: Reserva) {
    this.reserva.usuario = this.usuario;
    this.reservaService.saveReserva(reserva).subscribe({
      next: (data) => {
        this.toastr.success(data.message, 'Ok', {
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

  //========= update reserva
  updateReserva(id: number, reserva: Reserva) {
    this.reserva.usuario = this.usuario;
    this.reservaService.updateReserva(id, reserva).subscribe({
      next: (data: Reserva) => {
        this.toastr.success('Reserva actualizada', 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  //========calculate precio total
  calcularTotalReserva() {
    if (this.reserva.mesa) {
      this.totalReserva =
        this.reserva.mesa.costo_mesa + this.reserva.costo_reserva;
      this.reserva.costo_total = this.totalReserva;
    } else {
      this.totalReserva = 0;
    }
  }
}
