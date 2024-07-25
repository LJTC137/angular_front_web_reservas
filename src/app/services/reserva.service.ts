import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reservacion.model';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  reservaURL = environment.reservaUrl;

  constructor(private httpClient: HttpClient) {}

  public getListReserva(): Observable<Reserva[]> {
    return this.httpClient.get<Reserva[]>(`${this.reservaURL}`);
  }

  public getListUserReserva(usuario: number): Observable<any[]> {
    return this.httpClient.get<Reserva[]>(
      `${this.reservaURL}` + `user/` + `${usuario}`
    );
  }

  public getByIdReserva(id: number): Observable<any> {
    return this.httpClient.get<Reserva>(`${this.reservaURL}${id}`);
  }

  public saveReserva(reserva: Reserva): Observable<any> {
    return this.httpClient.post<any>(`${this.reservaURL}`, reserva);
  }

  public updateReserva(id: number, reserva: Reserva): Observable<any> {
    return this.httpClient.patch<any>(`${this.reservaURL}${id}`, reserva);
  }

  public deleteReserva(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.reservaURL}${id}`);
  }
}
