import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuxUsuario } from 'src/app/models/aux-user.model'; 
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  id_user: any;
  usuario: AuxUsuario = new AuxUsuario();
  isEditing = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_user = this.tokenService.getIdUser() ?? 0;
    this.getUserById(this.id_user);
  }

  private getUserById(usuario: number) {
    this.authService.getUserById(usuario).subscribe({
      next: (data: AuxUsuario) => {
        this.usuario = data;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  editProfile() {
    this.isEditing = !this.isEditing;
  }

  updateUser(id: number, usuario: AuxUsuario) {

    this.authService.updateUser(id, usuario).subscribe({
      next: (data: AuxUsuario) => {
        this.toastrService.success('Usuario actualizado', 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
}
