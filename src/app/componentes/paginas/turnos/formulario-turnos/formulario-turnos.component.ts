import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Conductor } from 'src/app/modelos/conductor';
import { Viaje } from 'src/app/modelos/viaje';
import { Turno } from 'src/app/modelos/turno';
import { ServicioConductoresService } from 'src/app/servicios/servicio-conductores.service';
import { ServicioTurnosService } from 'src/app/servicios/servicio-turnos.service';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  viajes: Viaje[] = [];
  turnoNuevo: boolean;

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
    fecha: false,
    grupo: false,
    viajes: false
  }

  constructor(
    private conductoresService:ServicioConductoresService, 
    private servicioTurnos:ServicioTurnosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id_turno = this.route.snapshot.queryParams["id_turno"];
    this.turnoNuevo = id_turno == undefined;
    if(!this.turnoNuevo){      
      this.servicioTurnos.ObtenerTurno(id_turno).subscribe((turno)=>{
        this.viajes = turno.viajes;
        console.log(this.viajes);
        this.turno = turno;
        
      });
    }
    this.conductoresService.ObtenerConductores().subscribe(conductores=>{this.conductores = conductores})
  }

  CrearTurno(){
    if(this.ValidarTurno('registrar'))
    { 

      this.servicioTurnos.CrearTurno(this.turno).subscribe(result=>{
        this.router.navigateByUrl("/turnos");
      }); 
    }
  }

  EditarTurno(){
    console.log("Turno",this.turno)
    this.servicioTurnos.EditarTurno(this.turno).subscribe(result=>{
      this.router.navigateByUrl("/turnos");
    });
  }


  ValidarTurno(action:string){
    if(this.turno.fecha === "" || (action=="registrar" && this.turno.fecha == undefined)){this.mensajeErrorValidacion.fecha="Fecha necesaria"; this.validacion.fecha = false}else if(this.turno.fecha < moment().format('YYYY-MM-DD')){this.mensajeErrorValidacion.fecha="Fecha invalida"; this.validacion.fecha = false}else{this.validacion.fecha =true};
    if(this.turno.grupo === "" || (action=="registrar" && this.turno.grupo == undefined)){this.mensajeErrorValidacion.grupo="Grupo necesario"; this.validacion.grupo = false}else{this.validacion.grupo =true};
    if( this.turno.viajes.length < 1 ){this.mensajeErrorValidacion.viajes="Necesita registrar al menos un viaje"; this.validacion.viajes = false}else if(this.turno.viajes.filter((v)=>{return v.numero_turno == this.formulario.turnoConductor}).length>1){this.mensajeErrorValidacion.viajes="El turno ingresado ya existe"; this.botonAgregarHabilitado=false ;this.validacion.viajes = false}else{this.validacion.viajes =true; this.botonAgregarHabilitado=true};
    
    const response = this.validacion.fecha && this.validacion.grupo && this.validacion.viajes;
    return response;
  }

  AgregarViaje(){
    var turnoAgregar = new Viaje();
    turnoAgregar.id_carnet_conductor =  this.formulario.carnetConductor;
    turnoAgregar.numero_turno = this.formulario.turnoConductor;
    turnoAgregar.estado="";
    turnoAgregar.hora_salida="";
    turnoAgregar.hora_llegada="";
    turnoAgregar.aporte="";
    turnoAgregar.id_turno = null;
    this.turno.viajes.push(turnoAgregar);
    this.ValidarTurno('verificar');
    this.formulario.carnetConductor = "";
    this.formulario.turnoConductor = "";
    
  }

  getConductorNombre(carnet:Number){
    var respuesta = this.conductores.filter(c=>{return c.carnet ==carnet});
    return respuesta[0].nombre + " " +respuesta[0].apellido_paterno;
  }

  BorrarTurno(IdABorrar:Number){
    // this.viajes.forEach((value,index)=>{
    //   if(value.id_carnet_conductor==IdABorrar) this.viajes.splice(index,1);
    // });
    this.turno.viajes.forEach((value,index)=>{
      if(value.id_carnet_conductor==IdABorrar) this.turno.viajes.splice(index,1);
    });
    this.ValidarTurno('verificar');
  }

  Cancelar(){
    this.router.navigateByUrl("/turnos");
  }

}
