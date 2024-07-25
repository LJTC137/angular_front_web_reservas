import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mesa } from 'src/app/models/mesa.model';
import { MesaService } from 'src/app/services/mesa.service';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss'],
})
export class TableFormComponent implements OnInit {
  mesa: Mesa = new Mesa();
  isEditing: boolean = false;

  constructor(
    private mesaService: MesaService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (history.state.isNew) {
      this.isEditing = true;
      this.mesa = history.state.data;
    } else {
      this.isEditing = false;
      this.mesa = new Mesa();
    }
  }

  saveMesa(mesa: Mesa) {
    this.mesaService.saveMesa(mesa).subscribe({
      next: (data: Mesa) => {
        this.toastr.success('Mesa creada', 'Ok', {
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

  updateMesa(id: number, mesa: Mesa) {
    this.mesaService.updateMesa(id, mesa).subscribe({
      next: (data: Mesa) => {
        this.toastr.success('Mesa actualizada', 'Ok', {
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
}
