import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conductor } from 'src/app/modelos/conductor';
import { Turno } from 'src/app/modelos/turno';
import { ServicioConductoresService } from 'src/app/servicios/servicio-conductores.service';
import { ServicioTurnosService } from 'src/app/servicios/servicio-turnos.service';
import 'moment/locale/es';
import { Viaje } from 'src/app/modelos/viaje';
import { ModalOpcionesViajesComponent } from 'src/app/componentes/modals/modal-opciones-viajes/modal-opciones-viajes.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';


@Component({
  selector: 'app-detalles-turno',
  templateUrl: './detalles-turno.component.html',
  styleUrls: ['./detalles-turno.component.css']
})
export class DetallesTurnoComponent implements OnInit {

  conductores: Conductor [];
  turno: Turno;

  sindicatoCargado: number;
  sindicatoUsuario: number;

  constructor(
    private conductoresService:ServicioConductoresService, 
    private turnoService:ServicioTurnosService, 
    private route: ActivatedRoute,
    private router:Router,
    public modalService: NgbModal,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    const idTurno = Number(this.route.snapshot.paramMap.get("id_turno"));
    this.sindicatoCargado = Number(this.route.snapshot.queryParams["id_sindicato"]);
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.turnoService.ObtenerTurno(idTurno).subscribe(turno=>{
      this.turno = turno;
      if(this.sindicatoCargado!=this.sindicatoUsuario || this.turno.id_sindicato != this.sindicatoUsuario){
        this.router.navigate(['/']);
      }
    });
  }
  
  opcionesViaje(viaje:Viaje){ 
    let copiaViaje = {...viaje};
    const modalRef = this.modalService.open(ModalOpcionesViajesComponent, { size: 'lg'});
    modalRef.componentInstance.viaje = copiaViaje;
  }

  Atras(){
    this._location.back();
  }


}
