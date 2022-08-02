import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Conductor } from 'src/app/modelos/conductor';
import { Reserva } from 'src/app/modelos/reserva';
import { Viaje } from 'src/app/modelos/viaje';
import { ServicioConductoresService } from 'src/app/servicios/servicio-conductores.service';
import { ServicioReservasService } from 'src/app/servicios/servicio-reservas.service';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';

@Component({
  selector: 'app-formulario-reservas',
  templateUrl: './formulario-reservas.component.html',
  styleUrls: ['./formulario-reservas.component.css']
})
export class FormularioReservasComponent implements OnInit {
  reserva: Reserva  = new Reserva();
  conductores: Conductor[];
  viajes: Viaje[];
  reservaNueva: boolean = true;

  validacion= {
    fecha : true,
    cantidad: true,
    nombre_completo_reserva: true,
    id_conductor: true,
    id_viaje: true,
    celular: true,
  }

  mensajeErrorValidacion= {
    fecha : "",
    cantidad: "",
    nombre_completo_reserva: "",
    celular: "",
    viaje: ""
  }
  constructor(
    private conductoresService:ServicioConductoresService,
    private viajesService:ServicioViajesService ,
    private reservaService:ServicioReservasService,
    private router: Router,
    private route: ActivatedRoute 
  ){ }

  ngOnInit(): void {
    this.conductoresService.ObtenerConductores().subscribe(conductores=>{this.conductores = conductores})
    this.viajesService.ObtenerViajes().subscribe(viajes=>{this.viajes = viajes.filter((v)=>{return v.hora_salida==""})})

  }

  ValidarReserva(action:String):boolean{
    if(this.reserva.fecha === "" || (action=="registrar" && this.reserva.fecha == undefined)){this.mensajeErrorValidacion.fecha="Fecha necesaria"; this.validacion.fecha = false}else if(this.reserva.fecha < moment().format('YYYY-MM-DD')){this.mensajeErrorValidacion.fecha="Fecha invalida"; this.validacion.fecha = false}else{this.validacion.fecha =true};
    if(this.reserva.cantidad === null || (action=="registrar" && this.reserva.cantidad == undefined)){this.mensajeErrorValidacion.cantidad="Cantidad necesaria"; this.validacion.cantidad = false}else{this.validacion.cantidad =true};
    if(this.reserva.id_viaje === null || (action=="registrar" && this.reserva.id_viaje == undefined)){this.mensajeErrorValidacion.viaje="Se debe de seleccionar un viaje"; this.validacion.id_viaje = false}else{this.validacion.id_viaje =true};
    if(this.reserva.nombre_completo_reserva === "" || (action=="registrar" && this.reserva.nombre_completo_reserva == undefined)){this.mensajeErrorValidacion.nombre_completo_reserva="Nombre de referencia necesario"; this.validacion.nombre_completo_reserva = false}else{this.validacion.nombre_completo_reserva =true};
    if(this.reserva.celular === null || (action=="registrar" && this.reserva.celular == undefined)){this.mensajeErrorValidacion.celular="Celular necesario"; this.validacion.celular = false}else{this.validacion.celular =true};

    const response = this.validacion.fecha && this.validacion.cantidad && this.validacion.nombre_completo_reserva &&
    this.validacion.celular && this.validacion.id_conductor && this.validacion.id_viaje;
    return response;
  }


  SeleccionarViaje(id_viaje:number){
    this.reserva.id_viaje = id_viaje;
    this.ValidarReserva("verificar");
  }

  EditarReserva(){

  }

  RegistrarReserva(){
    if(this.ValidarReserva("registrar"))
    {
 
      var reservaEnviar = new Reserva();
      reservaEnviar.fecha = this.reserva.fecha;
      reservaEnviar.cantidad = this.reserva.cantidad;
      if(this.viajes.length == 0)
      {
        reservaEnviar.id_conductor = this.reserva.id_conductor;
        reservaEnviar.id_viaje = null;
      }
      else{ 
        reservaEnviar.id_conductor = null;
        reservaEnviar.id_viaje = this.reserva.id_viaje;
      }
      reservaEnviar.nombre_completo_reserva = this.reserva.nombre_completo_reserva;
      reservaEnviar.celular = this.reserva.celular;
      console.log("Reserva a enviar", reservaEnviar);
      /*this.reservaService.CrearReserva(reservaEnviar).subscribe(result=>{
        this.router.navigateByUrl("/reservas");
      });*/
    } 
  }

  Cancelar(){
    this.router.navigateByUrl("/reservas");
  }

}
