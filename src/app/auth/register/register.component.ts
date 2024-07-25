import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  usuario: Usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  onRegister(): void {
    this.authService.createClient(this.usuario).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'OK', {
          timeOut: 3800,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/auth']);
      },
      (err) => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3800,
          positionClass: 'toast-top-center',
        });
      }
    );
  }
}
