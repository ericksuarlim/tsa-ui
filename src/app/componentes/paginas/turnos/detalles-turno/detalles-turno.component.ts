import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conductor } from 'src/app/modelos/conductor';
import { Turno } from 'src/app/modelos/turno';
import { ServicioConductoresService } from 'src/app/servicios/servicio-conductores.service';
import { ServicioTurnosService } from 'src/app/servicios/servicio-turnos.service';
import * as moment from 'moment';
import 'moment/locale/es';

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

  EditarViaje(id_viaje:number){
    this.router.navigate(["/viajes/formulario"], { queryParams: { id_viaje } });

  }

  getConductorNombre(carnet:Number){
    var respuesta = this.conductores.filter(c=>{return c.carnet ==carnet});
    return respuesta[0].nombre + " " +respuesta[0].apellido_paterno;
  }

  FormatoFecha(){
    return moment(this.turno.fecha).format("dddd, DD MMMM YYYY");
  }

}
