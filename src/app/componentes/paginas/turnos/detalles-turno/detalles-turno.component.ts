import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conductor } from 'src/app/modelos/conductor';
import { Turno } from 'src/app/modelos/turno';
import { ServicioConductoresService } from 'src/app/servicios/servicio-conductores.service';
import { ServicioTurnosService } from 'src/app/servicios/servicio-turnos.service';
import * as moment from 'moment';
import 'moment/locale/es';
import { Viaje } from 'src/app/modelos/viaje';
import { ModalOpcionesViajesComponent } from 'src/app/componentes/modals/modal-opciones-viajes/modal-opciones-viajes.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalles-turno',
  templateUrl: './detalles-turno.component.html',
  styleUrls: ['./detalles-turno.component.css']
})
export class DetallesTurnoComponent implements OnInit {

  conductores: Conductor [];
  turno: Turno;
  constructor(
    private conductoresService:ServicioConductoresService, 
    private turnoService:ServicioTurnosService, 
    private route: ActivatedRoute,
    private router:Router,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    const idTurno = Number(this.route.snapshot.paramMap.get("id_turno"));
    this.conductoresService.ObtenerConductores().subscribe(conductores=>{
      this.conductores = conductores;
    })
    this.turnoService.ObtenerTurno(idTurno).subscribe(turno=>{this.turno = turno});
  }

  EliminarTurno(){

  }

  opcionesViaje(viaje:Viaje){ 
    let copiaViaje = new Viaje()
    copiaViaje = {...viaje};
    const modalRef = this.modalService.open(ModalOpcionesViajesComponent);
    modalRef.componentInstance.viaje = copiaViaje;
  }

  getConductorNombre(carnet:Number){
    var respuesta = this.conductores.filter(c=>{return c.carnet ==carnet});
    return respuesta[0].nombre + " " +respuesta[0].apellido_paterno;
  }

}
