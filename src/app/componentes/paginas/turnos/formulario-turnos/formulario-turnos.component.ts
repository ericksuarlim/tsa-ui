import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Conductor } from 'src/app/modelos/conductor';
import { Viaje } from 'src/app/modelos/viaje';
import { Turno } from 'src/app/modelos/turno';
import { ServicioConductoresService } from 'src/app/servicios/servicio-conductores.service';
import { ServicioTurnosService } from 'src/app/servicios/servicio-turnos.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-formulario-turnos',
  templateUrl: './formulario-turnos.component.html',
  styleUrls: ['./formulario-turnos.component.css']
})
export class FormularioTurnosComponent implements OnInit {
  viaje: Viaje = new Viaje();
  turno: Turno = new Turno();
  botonAgregarHabilitado: boolean = true;

  conductores: Conductor[];
  conductoresDisponibles: Conductor[];
  viajes: Viaje[] = [];
  turnoNuevo: boolean;
  sindicatoUsuario: number;
  nombreSindicato: string;

  formulario={
    turnoConductor: null,
    carnetConductor: null,
  }

  mensajeErrorValidacion={
    fecha: "",
    grupo: "",
    viajes: ""
  }

  validacion={
    fecha: true,
    grupo: true,
    viajes: true
  }

  constructor(
    private conductoresService:ServicioConductoresService, 
    private servicioTurnos:ServicioTurnosService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    const id_turno = this.route.snapshot.queryParams["id_turno"];
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.turnoNuevo = id_turno == undefined;
    this.nombreSindicato = JSON.parse(localStorage.getItem("sindicatos"))[this.sindicatoUsuario-1].nombre;

    if(!this.turnoNuevo){      
      this.servicioTurnos.ObtenerTurno(id_turno).subscribe((turno)=>{
        this.viajes = turno.viajes;
        this.turno = turno;
      });
    }
    this.conductoresService.ObtenerConductoresPorSindicato(this.sindicatoUsuario).subscribe(conductores=>{
      this.conductores = conductores;
      this.conductoresDisponibles = conductores;
    })
  }

  CrearTurno(){
    if(this.ValidarTurno('registrar'))
    { 
      this.turno.id_sindicato = this.sindicatoUsuario;
      this.servicioTurnos.CrearTurno(this.turno).subscribe(result=>{
        this.router.navigate([`/turnos`], { queryParams: { id_sindicato:this.sindicatoUsuario }})
      }); 
    }
  }

  EditarTurno(){
    if(this.ValidarTurno('registrar'))
    { 
      this.servicioTurnos.EditarTurno(this.turno).subscribe(result=>{
        this.router.navigate([`/turnos`], { queryParams: { id_sindicato:this.sindicatoUsuario }})
      });
    }
  }


  ValidarTurno(action:string){
    if(this.turno.fecha === null || (action=="registrar" && this.turno.fecha == undefined)){this.mensajeErrorValidacion.fecha="Fecha necesaria"; this.validacion.fecha = false}else if(moment(this.turno.fecha).format('YYYY-MM-DD')< moment().format('YYYY-MM-DD')){this.mensajeErrorValidacion.fecha="Fecha invalida"; this.validacion.fecha = false}else{this.validacion.fecha =true}
    if(this.turno.grupo === "" || (action=="registrar" && this.turno.grupo == undefined)){this.mensajeErrorValidacion.grupo="Grupo necesario"; this.validacion.grupo = false}else{this.validacion.grupo =true}
    if( this.turno.viajes.length < 1 ){this.mensajeErrorValidacion.viajes="Necesita registrar al menos un viaje"; this.validacion.viajes = false}else if(this.turno.viajes.filter((v)=>{return v.numero_turno == this.formulario.turnoConductor}).length>1){this.mensajeErrorValidacion.viajes="El turno ingresado ya existe"; this.botonAgregarHabilitado=false ;this.validacion.viajes = false}else{this.validacion.viajes =true; this.botonAgregarHabilitado=true}
    
    const response = this.validacion.fecha && this.validacion.grupo && this.validacion.viajes;
    return response;
  }

  AgregarViaje(){
    let turnoAgregar = new Viaje();
    turnoAgregar.id_carnet_conductor =  this.formulario.carnetConductor;
    turnoAgregar.numero_turno = this.formulario.turnoConductor;
    turnoAgregar.fecha= this.turno.fecha;
    turnoAgregar.id_turno = this.turno.id_turno;
    this.turno.viajes.push(turnoAgregar);
    this.ValidarTurno('verificar');
    this.formulario.carnetConductor = "";
    this.formulario.turnoConductor = "";
    
  }

  getConductorNombre(carnet:number){
      const con = this.conductores?.find(c=>{return c.carnet===Number(carnet)});
      return con?.nombre + " " + con?.apellido_paterno;

  }

  BorrarTurno(IdABorrar:number){
    this.turno.viajes.forEach((value,index)=>{
      if(value.id_carnet_conductor==IdABorrar) this.turno.viajes.splice(index,1);
    });
    this.ValidarTurno('verificar');
  }

  Cancelar(){
    this.router.navigate([`/turnos`], { queryParams: { id_sindicato:this.sindicatoUsuario }})
  }

  DesabilitarConductores(carnet:number){
    return  this.turno.viajes.some(v=>Number(v.id_carnet_conductor)===carnet); 
  }

}
