import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from 'src/app/modelos/reserva';
import { ServicioReservasService } from 'src/app/servicios/servicio-reservas.service';

@Component({
  selector: 'app-principal-reservas',
  templateUrl: './principal-reservas.component.html',
  styleUrls: ['./principal-reservas.component.css']
})
export class PrincipalReservasComponent implements OnInit {

  reservas: Reserva[];
  constructor(
    private servicioReservas:ServicioReservasService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.servicioReservas.ObtenerReservas().subscribe(reservas =>{this.reservas= reservas});
  }

  opcionesReserva(id_reserva: number){

  }

}
