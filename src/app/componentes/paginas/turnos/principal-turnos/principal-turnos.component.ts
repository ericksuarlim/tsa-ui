import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Turno } from 'src/app/modelos/turno';
import { ServicioTurnosService } from 'src/app/servicios/servicio-turnos.service';

@Component({
  selector: 'app-principal-turnos',
  templateUrl: './principal-turnos.component.html',
  styleUrls: ['./principal-turnos.component.css']
})
export class PrincipalTurnosComponent implements OnInit {

  turnos: Turno[];
  constructor(
    private servicioTurnos: ServicioTurnosService,
    private router:Router,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.servicioTurnos.ObtenerTurnos().subscribe(turnos =>{this.turnos= turnos});
  }

}
