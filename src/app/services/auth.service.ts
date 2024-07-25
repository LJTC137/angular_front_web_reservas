import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginUsuarioModel } from '../models/login.model';
import { Observable } from 'rxjs';
import { Usuario as UsuarioModel } from '../models/usuario.model';
import { AuxUsuario as AuxUsuarioModel } from '../models/aux-user.model';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authUrl;

  constructor(private httpClient: HttpClient) { }

  //=================================== Usuario
  public login(dto: LoginUsuarioModel): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', dto);
  }

  public createClient(dto: UsuarioModel): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', dto);
  }

  public refresh(dto: TokenModel): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'refresh', dto);
  }

  public updateUser(id_usuario: number, usuario: AuxUsuarioModel): Observable<any> {
    return this.httpClient.patch<any>(`${this.authURL}${id_usuario}`, usuario);
  }

  public delete(id_usuario: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.authURL}${id_usuario}`);
  }

  public getUserById(id_usuario: number): Observable<UsuarioModel> {
    return this.httpClient.get<UsuarioModel>(`${this.authURL}${id_usuario}`);
  }

  public getList(): Observable<UsuarioModel[]> {
    return this.httpClient.get<UsuarioModel[]>(`${this.authURL}`);
  }

}
