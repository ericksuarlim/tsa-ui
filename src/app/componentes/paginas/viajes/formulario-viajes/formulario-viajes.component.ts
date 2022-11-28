import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import {Location} from '@angular/common';
import { Conductor } from 'src/app/modelos/conductor';
import { Viaje } from 'src/app/modelos/viaje';
import { ServicioConductoresService } from 'src/app/servicios/servicio-conductores.service';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';

@Component({
  selector: 'app-formulario-viajes',
  templateUrl: './formulario-viajes.component.html',
  styleUrls: ['./formulario-viajes.component.css']
})
export class FormularioViajesComponent implements OnInit {

  viaje: Viaje = new Viaje();
  viajeNuevo: boolean = true;
  conductores: Conductor[];
  sindicatoUsuario: number;
  ciudades: string[] = ['Santa Ana', 'Trinidad', 'San Joaquin', 'San Ramon', 'Guayara', 'San Ingacio', 'Cayubaba', 'Peru', 'Magdalena']


  validacion= {
    id_carnet_conductor:true,
    hora_salida: true,
    hora_llegada: true,
    origen: true,
    destino: true,
    ubicacion: true,
    aporte: true,
    disponibilidad: true,
    fecha:true
  }
  mensajeErrorValidacion= {
    id_carnet_conductor: "",
    hora_salida: "",
    hora_llegada: "",
    origen: "",
    destino: "",
    ubicacion: "",
    aporte: "",
    disponibilidad: "",
    fecha:""
  }

  constructor(
    private conductoresService:ServicioConductoresService,
    private viajesService:ServicioViajesService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    const id_viaje = this.route.snapshot.queryParams["id_viaje"];
    this.viajeNuevo = id_viaje == undefined;
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    if(!this.viajeNuevo){
      this.viajesService.ObtenerViaje(id_viaje).subscribe(viaje=>{
        if(viaje.conductore.id_sindicato===this.sindicatoUsuario){
          this.viaje=viaje;
        }
        else
        {
          this.router.navigate(['/']); 
        }        
      });
    }  
    this.conductoresService.ObtenerConductoresPorSindicato(this.sindicatoUsuario).subscribe(conductores=>{this.conductores = conductores})
  }

  CrearViaje(){
    if(this.ValidarCampos('registrar'))
    {
      this.viaje.id_turno =0;
      this.viaje.numero_turno = 0;
      this.viajesService.CrearViaje(this.viaje).subscribe(result=>{
        this.router.navigate([`/viajes`], { queryParams: { id_sindicato:this.sindicatoUsuario }})
      });
    }
  }

  ValidarCampos(action: string){
    if(this.viaje.id_carnet_conductor === null || (action=="registrar" && this.viaje.id_carnet_conductor == undefined)){this.mensajeErrorValidacion.id_carnet_conductor="Debe seleccionar un conductor"; this.validacion.id_carnet_conductor = false}else{this.validacion.id_carnet_conductor =true}
    if(this.viaje.fecha === null || (action=="registrar" && this.viaje.fecha == undefined)){this.mensajeErrorValidacion.fecha="Fecha necesaria"; this.validacion.fecha = false}else if(moment(this.viaje.fecha).format('YYYY-MM-DD')< moment().format('YYYY-MM-DD')){this.mensajeErrorValidacion.fecha="Fecha invalida"; this.validacion.fecha = false}else{this.validacion.fecha =true}
    if(this.viaje.hora_salida === "" || (action=="registrar" && this.viaje.hora_salida == undefined)){this.mensajeErrorValidacion.hora_salida="Hora de salidad necesaria"; this.validacion.hora_salida = false}else{this.validacion.hora_salida =true}
    if(this.viaje.hora_llegada === "" || (action=="registrar" && this.viaje.hora_llegada == undefined)){this.mensajeErrorValidacion.hora_llegada="Hora de llegada necesaria"; this.validacion.hora_llegada = false}else{this.validacion.hora_llegada =true}
    if(this.viaje.origen === "" || (action=="registrar" && this.viaje.origen == undefined)){this.mensajeErrorValidacion.origen="Origen necesario"; this.validacion.origen = false}else{this.validacion.origen =true}
    if(this.viaje.destino === "" || (action=="registrar" && this.viaje.destino == undefined)){this.mensajeErrorValidacion.destino="Destino necesario"; this.validacion.destino = false}else{this.validacion.destino =true}
    if((this.viaje.disponibilidad === null && this.viajeNuevo)|| (action=="registrar" && this.viaje.disponibilidad == undefined)){this.mensajeErrorValidacion.disponibilidad="Disponibilidad necesaria"; this.validacion.disponibilidad = false}else{this.validacion.disponibilidad =true}
    if(this.viaje.aporte === "" || (action=="registrar" && this.viaje.aporte == undefined)){this.mensajeErrorValidacion.aporte="Aporte necesario"; this.validacion.aporte = false}else{this.validacion.aporte =true}
    if(this.viaje.ubicacion === "" || (action=="registrar" && this.viaje.ubicacion == undefined)){this.mensajeErrorValidacion.ubicacion="Ubicacion necesario"; this.validacion.ubicacion = false}else{this.validacion.ubicacion =true}

    const response = this.validacion.id_carnet_conductor&& this.validacion.hora_salida && this.validacion.hora_llegada && this.validacion.origen
    && this.validacion.destino && this.validacion.disponibilidad && this.validacion.aporte && this.validacion.ubicacion ;
    return response;
  }

  EditarViaje(){
    if(this.ValidarCampos('registrar'))
    {
      this.viajesService.EditarViaje(this.viaje).subscribe(result=>{
        this.router.navigate([`/viajes`], { queryParams: { id_sindicato:this.sindicatoUsuario }})
      });
    }
  }

  Cancelar(){
    this._location.back();
  }
}
