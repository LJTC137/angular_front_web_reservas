import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mesa } from 'src/app/models/mesa.model';
import { MesaService } from 'src/app/services/mesa.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  mesasList: Mesa[] = [];
  eliminateId: number = 0;

  constructor(
    private router: Router,
    private mesaService: MesaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTableList();
  }

  private getTableList() {
    this.mesaService.getListMesa().subscribe({
      next: (data: Mesa[]) => {
        this.mesasList = data;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  setEliminateTable(table: Mesa) {
    this.eliminateId = table.id_mesa;
    console.log(this.eliminateId);
  }

  deleteTable() {
    this.mesaService.deleteMesa(this.eliminateId).subscribe({
      next: (data) => {
        this.toastr.success('Mesa eliminada', 'Ok', {
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
