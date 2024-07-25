import { Mesa } from './mesa.model';
import { Usuario } from './usuario.model';

export class Reserva {
  id_reserva: number = 0;
  fecha_reserva: Date = new Date();
  fecha_registro_reserva: Date = new Date();
  nombre_reservacion: string = "";
  estado: boolean = true;
  costo_reserva: number = 10.0;
  costo_total: number = 0;
  usuario: Usuario = new Usuario();
  mesa: Mesa = new Mesa();
}
