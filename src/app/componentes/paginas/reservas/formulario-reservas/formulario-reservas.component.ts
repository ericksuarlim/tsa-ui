import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Reserva } from 'src/app/modelos/reserva';
import { Sindicato } from 'src/app/modelos/sindicato';
import { Viaje } from 'src/app/modelos/viaje';
import { ServicioReservasService } from 'src/app/servicios/servicio-reservas.service';
import { ServicioSindicatosService } from 'src/app/servicios/servicio-sindicatos.service';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';
import {Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCodigoReservaComponent } from 'src/app/componentes/modals/modal-codigo-reserva/modal-codigo-reserva.component';

@Component({
  selector: 'app-formulario-reservas',
  templateUrl: './formulario-reservas.component.html',
  styleUrls: ['./formulario-reservas.component.css']
})
export class FormularioReservasComponent implements OnInit {
  reserva: Reserva  = new Reserva();
  viajes: Viaje[];
  viajesFiltrados: Viaje[];
  ipAddress: string;
  usuarioAdmitido: boolean;
  reservasAdmitidas: boolean = true;
  usuario: string;

  sindicatos: Sindicato[];
  reservaNueva: boolean = true;

  validacion= {
    fecha : true,
    cantidad: true,
    nombre_completo_reserva: true,
    id_viaje: true,
    celular: true,
    id_sindicato: true
  }

  mensajeErrorValidacion= {
    fecha : "",
    cantidad: "",
    nombre_completo_reserva: "",
    celular: "",
    viaje: "",
    id_sindicato: ""
  }
  constructor(
    private sindicatosServices:ServicioSindicatosService,
    private viajesService:ServicioViajesService ,
    private reservaService:ServicioReservasService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private http:HttpClient,
    public modalService: NgbModal,

  ){ 
  }

  ngOnInit() {
    this.usuario = localStorage.getItem('nombre_usuario');
    this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip
      this.reservaService.ValidarReservasIp(res.ip).subscribe((resp)=>{
        if(this.usuario===null && !resp){
          this.reservasAdmitidas = false;
        }
        else{
          this.reservasAdmitidas = true;
          this.viajesService.ObtenerViajes().subscribe(viajes=>{
            this.viajes = viajes
            this.viajesFiltrados = viajes.filter((v:Viaje)=>{return (moment(v.fecha).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'))});
          })
          this.reserva.fecha = new Date();
          this.sindicatosServices.ObtenerSindicatos().subscribe(sindicatos=>{this.sindicatos = sindicatos})
        }
      });
    });
  }

  FiltrarViajes(name:string){
    if(name==='cantidad'){ this.reserva.id_viaje = null; this.reserva.id_sindicato =null}
    this.viajesFiltrados = this.viajes.filter((v:Viaje)=>{return (moment(this.reserva.fecha).format('YYYY-MM-DD') === moment(v.fecha).format('YYYY-MM-DD') && (v.disponibilidad >= this.reserva.cantidad || this.reserva.cantidad === undefined || this.reserva.cantidad === null))});
  }

  ValidarReserva(action:string):boolean{
    if(this.reserva.fecha === null || (action=="registrar" && this.reserva.fecha == undefined)){this.mensajeErrorValidacion.fecha="Fecha necesaria"; this.validacion.fecha = false}else if(moment(this.reserva.fecha).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){this.mensajeErrorValidacion.fecha="Fecha invalida"; this.validacion.fecha = false}else{this.validacion.fecha =true}
    if(this.reserva.cantidad === null  || (action=="registrar" && this.reserva.cantidad == undefined)){this.mensajeErrorValidacion.cantidad="Cantidad necesaria"; this.validacion.cantidad = false}else if(this.reserva.cantidad===0){this.mensajeErrorValidacion.cantidad="Cantidad invalida"; this.validacion.cantidad = false}else if(this.reserva.cantidad>8){this.mensajeErrorValidacion.cantidad="Cantidad maxima 8"; this.validacion.cantidad = false}else{this.validacion.cantidad =true}
    if((this.reserva.id_viaje === null && this.viajesFiltrados?.length>0) || (action=="registrar" && this.reserva.id_viaje == undefined && this.viajesFiltrados?.length>0)){this.mensajeErrorValidacion.viaje="Se debe de seleccionar un viaje"; this.validacion.id_viaje = false}else{this.validacion.id_viaje =true}
    if(this.reserva.nombre_completo_reserva === "" || (action=="registrar" && this.reserva.nombre_completo_reserva == undefined)){this.mensajeErrorValidacion.nombre_completo_reserva="Nombre de referencia necesario"; this.validacion.nombre_completo_reserva = false}else{this.validacion.nombre_completo_reserva =true}
    if(this.reserva.celular === null || ( action=="registrar" && this.reserva.celular == undefined)){this.mensajeErrorValidacion.celular="Celular necesario"; this.validacion.celular = false}else if(this.reserva.celular<0){this.mensajeErrorValidacion.celular="Celular invalido";this.validacion.celular=false}else{this.validacion.celular =true}
    if((this.reserva.id_sindicato === null && this.viajesFiltrados?.length===0) || (action=="registrar" && this.reserva.id_sindicato == undefined && this.viajesFiltrados?.length===0)){this.mensajeErrorValidacion.id_sindicato="Sindicato necesario"; this.validacion.id_sindicato = false}else{this.validacion.id_sindicato =true}

    const response = this.validacion.fecha && this.validacion.cantidad && this.validacion.nombre_completo_reserva &&
    this.validacion.celular && this.validacion.id_sindicato && this.validacion.id_viaje;
   
    return response;
  }

  SeleccionarViaje(id_viaje:number){
    this.reserva.id_viaje = id_viaje;
    this.ValidarReserva("verificar");
  }

  RegistrarReserva(){
    if(this.ValidarReserva("registrar"))
    {
      let reservaEnviar = new Reserva();
      reservaEnviar.fecha = this.reserva.fecha;
      reservaEnviar.cantidad = this.reserva.cantidad;
      if(this.viajesFiltrados.length == 0)
      {
        reservaEnviar.id_sindicato = this.reserva.id_sindicato;
        reservaEnviar.id_viaje = null;
      }
      else{ 

        reservaEnviar.id_sindicato = null;
        reservaEnviar.id_viaje = this.reserva.id_viaje;
      }

      reservaEnviar.nombre_completo_reserva = this.reserva.nombre_completo_reserva;
      reservaEnviar.celular = this.reserva.celular;
      reservaEnviar.estado = "Pendiente";
      reservaEnviar.codigo_reserva = Math.floor(Math.random() * 100000) + 1;
      reservaEnviar.ip_reserva = this.ipAddress;
      this.reservaService.CrearReserva(reservaEnviar).subscribe(result=>{
        this.MostrarCodigoReserva(result)
        this.router.navigate([`/reservas`])
      });
    } 
  }

  Cancelar(){
    this._location.back();
  }

  MostrarCodigoReserva(reserva: Reserva){
    let copiaReserva = {...reserva};
    const modalRef = this.modalService.open(ModalCodigoReservaComponent, {backdrop: 'static' });
    modalRef.componentInstance.reserva = copiaReserva;
  }
}
