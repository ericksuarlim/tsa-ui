import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Conductor } from 'src/app/modelos/conductor';
import { Viaje } from 'src/app/modelos/viaje';
import { Turno } from 'src/app/modelos/turno';
import { ServicioConductoresService } from 'src/app/servicios/servicio-conductores.service';
import { ServicioTurnosService } from 'src/app/servicios/servicio-turnos.service';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-turnos',
  templateUrl: './formulario-turnos.component.html',
  styleUrls: ['./formulario-turnos.component.css']
})
export class FormularioTurnosComponent implements OnInit {

  public items: Array<string>;
  private draggedIndex: number;

  registroManual: boolean =false;
  botonRegistroManual: boolean =false;

  viaje: Viaje = new Viaje();
  turno: Turno = new Turno();

  conductores: Conductor[];
  viajes: Viaje[] = [];

  formulario={
    turnoConductor: null,
    carnetConductor: null,
    grupoConductores:"",
  }

  mensajeErrorValidacion={
    fecha: "",
    grupo: ""
  }

  validacion={
    fecha: false,
    grupo: false
  }

  constructor(
    private conductoresService:ServicioConductoresService, 
    private servicioTurnos:ServicioTurnosService,
    private servicioViajes:ServicioViajesService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.conductoresService.ObtenerConductores().subscribe(conductores=>{this.conductores = conductores})
  }

  CrearViajes(){
    console.log("Estos son los viajes",this.viajes);
    this.servicioViajes.CrearViajes(this.viajes).subscribe(r=>{
      this.router.navigateByUrl("//turnos");
    });
  }

  allowDrop($event): void {
    $event.preventDefault();
 }

  
  onDragStart(index): void {
    this.draggedIndex = index;
  }

  onDrop($event, index): void {
    $event.preventDefault();
    const item = this.items[this.draggedIndex];
    this.items.splice(this.draggedIndex, 1);
    this.items.splice(index, 0, item);
    this.draggedIndex = -1;
  }

  CrearTurno(){
    if(this.ValidarTurno('registrar'))
    {
      this.registroManual = true;
      this.turno.id_sindicato = null;
      this.servicioTurnos.CrearTurno(this.turno).subscribe(()=>{this.botonRegistroManual = false;});

    }
  }

  ValidarTurno(action:string){
    if(this.turno.fecha === "" || (action=="registrar" && this.turno.fecha == undefined)){this.mensajeErrorValidacion.fecha="Fecha necesaria"; this.validacion.fecha = false}else if(this.turno.fecha < moment().format('YYYY-MM-DD')){this.mensajeErrorValidacion.fecha="Fecha invalida"; this.validacion.fecha = false}else{this.validacion.fecha =true};
    if(this.turno.grupo === "" || (action=="registrar" && this.turno.grupo == undefined)){this.mensajeErrorValidacion.grupo="Grupo necesario"; this.validacion.grupo = false}else{this.validacion.grupo =true};
    const response = this.validacion.fecha && this.validacion.grupo;
    return response;
  }

  AgregarViaje(){
    var turnoAgregar = new Viaje();
    turnoAgregar.id_carnet_conductor =  this.formulario.carnetConductor;
    turnoAgregar.numero_turno = this.formulario.turnoConductor;
    turnoAgregar.estado=null;
    turnoAgregar.hora_salida="10:50";
    turnoAgregar.hora_llegada=null;
    turnoAgregar.aporte=null;
    turnoAgregar.id_turno = null;
    this.viajes.push(turnoAgregar);
    this.formulario.carnetConductor = "";
    this.formulario.turnoConductor = "";
  }

  getConductorNombre(carnet:Number){
    var respuesta = this.conductores.filter(c=>{return c.carnet ==carnet});
    return respuesta[0].nombre + " " +respuesta[0].apellido_paterno;
  }

  BorrarTurno(IdABorrar:Number){
    this.viajes.forEach((value,index)=>{
      if(value.id_carnet_conductor==IdABorrar) this.viajes.splice(index,1);
  });
  }

}
