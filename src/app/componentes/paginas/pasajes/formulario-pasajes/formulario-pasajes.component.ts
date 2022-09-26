import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pasaje } from 'src/app/modelos/pasaje';
import { Viaje } from 'src/app/modelos/viaje';
import { ServicioPasajesService } from 'src/app/servicios/servicio-pasajes.service';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-formulario-pasajes',
  templateUrl: './formulario-pasajes.component.html',
  styleUrls: ['./formulario-pasajes.component.css']
})
export class FormularioPasajesComponent implements OnInit {

  constructor(
    private servicioPasaje:ServicioPasajesService,
    private router: Router,
    private route: ActivatedRoute,
    private viajesService:ServicioViajesService,
    private _location: Location
  ) { }

  pasaje: Pasaje = new Pasaje();
  viaje: Viaje = new Viaje();
  pasajeNuevo: boolean = true;
  sindicatoUsuario: number;
  nombreSindicato: string;

  validacion= {
    nombre_completo: true,
    pagado: true,
    precio: true,
    asiento: true,
    celular: true,
    carnet_pasajero: true
  }
  mensajeErrorValidacion= {
    nombre_completo: "",
    pagado: "",
    precio: "",
    asiento: "",
    celular: "",
    carnet_pasajero: ""
  }

  ngOnInit(): void {
    const id_viaje = this.route.snapshot.queryParams["id_viaje"];
    const id_pasaje = this.route.snapshot.queryParams["id_pasaje"];
    this.pasajeNuevo = id_pasaje ==undefined;
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.nombreSindicato = JSON.parse(localStorage.getItem("sindicatos"))[this.sindicatoUsuario-1].nombre;

    if(!this.pasajeNuevo){
      this.servicioPasaje.ObtenerPasaje(id_pasaje).subscribe((pasaje)=>{
        if(pasaje.viaje?.conductore?.id_sindicato===this.sindicatoUsuario){
          this.pasaje=pasaje;
        }
        else
        {
          this.router.navigate(['/']);
        }  
      });
    }
    this.viajesService.ObtenerViaje(id_viaje).subscribe(viaje=>{this.viaje=viaje})
  }

  ValidarCampos(action: string){
    if(this.pasaje.carnet_pasajero === null || (action=="registrar" && this.pasaje.carnet_pasajero == undefined)){this.mensajeErrorValidacion.carnet_pasajero="Carnet necesario"; this.validacion.carnet_pasajero = false}else{this.validacion.carnet_pasajero =true};
    if(this.pasaje.nombre_completo === "" || (action=="registrar" && this.pasaje.nombre_completo) == undefined){this.mensajeErrorValidacion.nombre_completo="Nombre necesario"; this.validacion.nombre_completo = false}else{this.validacion.nombre_completo =true};
    if(this.pasaje.pagado === null || (action=="registrar" && this.pasaje.pagado == undefined)){this.mensajeErrorValidacion.pagado="Estado de pago necesario"; this.validacion.pagado = false}else{this.validacion.pagado =true};
    if(this.pasaje.precio === null || (action=="registrar" && this.pasaje.precio == undefined)){this.mensajeErrorValidacion.precio="Precio necesario"; this.validacion.precio = false}else{this.validacion.precio =true};
    if(this.pasaje.celular === null || (action=="registrar" && this.pasaje.celular == undefined)){this.mensajeErrorValidacion.celular="Celular necesario"; this.validacion.celular = false}else{this.validacion.celular =true};
    if(this.pasaje.asiento === "" || (action=="registrar" && this.pasaje.asiento == undefined)){this.mensajeErrorValidacion.asiento="Asiento necesario"; this.validacion.asiento = false}else{this.validacion.asiento =true};

    const response = this.validacion.carnet_pasajero && this.validacion.nombre_completo && this.validacion.asiento && this.validacion.pagado && this.validacion.precio && this.validacion.celular;
    return response;
  }

  CrearPasaje(){
    if(this.ValidarCampos("registrar")){
      this.pasaje.id_viaje = this.viaje.id_viaje;
      this.servicioPasaje.CrearPasaje(this.pasaje).subscribe(result=>{
        this.sendViaWhatsApp(result);
        this._location.back();
      });
    }
  }

  ActualizarPasaje(){
    if(this.ValidarCampos("registrar")){
      this.servicioPasaje.EditarPasaje(this.pasaje).subscribe(result=>{
        this._location.back();
      });
    }
  }

  sendViaWhatsApp(pasajeNuevo:Pasaje) { 
    const urlRecibo = `${environment.urlApi}/pasajes/recibo/${pasajeNuevo.id_pasaje}?id_sindicato=${localStorage.getItem('id_sindicato_usuario')}`;
    const message = `Usted adquirió un boleto de transporte${(pasajeNuevo.viaje?.conductore?.sindicato?.nombre=== undefined) ? '' : "en el sindicato: "+pasajeNuevo.viaje?.conductore?.sindicato?.nombre}.%0A%0ASu boleto y recibo de compra digitales se encuentran en el siguiente enlace:%0A${urlRecibo}%0A%0AMuchas gracias por su preferencia!`;
    const phoneNumber = `591${this.pasaje.celular}`; 
    const messageText = message.split(' ').join('%20');; 
    var finalUrl = 'https://api.whatsapp.com/send?phone=' + phoneNumber + '&text=' + messageText ; 
    window.open(finalUrl, "_blank");
  }

  Cancelar(){
    this._location.back();
  }

}
