import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa as MesaModel } from '../models/mesa.model';


@Injectable({
  providedIn: 'root'
})
export class MesaService {

  mesaURL = environment.mesaUrl;

  constructor(private httpClient: HttpClient) { }

  public getListMesa(): Observable<MesaModel[]> {
    return this.httpClient.get<MesaModel[]>(`${this.mesaURL}`);
  }

  public getByIdMesa(id: number): Observable<MesaModel[]> {
    return this.httpClient.get<MesaModel[]>(`${this.mesaURL}${id}`);
  }

  public saveMesa(mesa: MesaModel): Observable<any> {
    return this.httpClient.post<any>(`${this.mesaURL}`, mesa);
  }

  public updateMesa(id: number, mesa: MesaModel): Observable<any> {
    return this.httpClient.patch<any>(`${this.mesaURL}${id}`, mesa);

  }

  public deleteMesa(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.mesaURL}${id}`);
  }
}
