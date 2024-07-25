import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isLogged = true;
  isAdmin = true;
  nombre_user = '';
  id_user: any;
  usuario: Usuario = new Usuario();

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged()
      ? true
      : (this.isLogged = false);
    this.isAdmin = this.tokenService.isAdmin() ?? false;
    this.nombre_user = this.tokenService.getNameUser() ?? '';
    this.id_user = this.tokenService.getIdUser() ?? 0;
    this.getUserById(this.id_user);
  }

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

  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/auth']);
  }

  adminReservation(): void {
    this.router.navigate(['/home/adminReservation']);
  }

  customerReservation(): void {
    this.router.navigate(['/home/customerReservation']);
  }

  profileNavigation(): void {
    this.router.navigate(['/home/profile']);
  }

  reservationFormNavigation(): void {
    this.router.navigate(['/home/reservationForm']);
  }

  tableListNavigation(): void {
    this.router.navigate(['/home/tableList']);
  }

  tableFormNavigation(): void {
    this.router.navigate(['/home/tableForm']);
  }
}
