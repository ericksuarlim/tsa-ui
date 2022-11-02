import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Encomienda } from 'src/app/modelos/encomienda';
import { Viaje } from 'src/app/modelos/viaje';
import { ServicioEncomiendasService } from 'src/app/servicios/servicio-encomiendas.service';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-formulario-encomiendas',
  templateUrl: './formulario-encomiendas.component.html',
  styleUrls: ['./formulario-encomiendas.component.css']
})
export class FormularioEncomiendasComponent implements OnInit {

  encomienda: Encomienda = new Encomienda();
  viaje: Viaje = new Viaje();
  esEncomiendaNueva: boolean = true;
  sindicatoUsuario: number;
  nombreSindicato: string;

  validacion= {
    nombre_cliente: true,
    pagada: true,
    monto_pago: true,
    carnet_cliente: true,
    celular_cliente: true,
    cantidad_bultos: true,
    detalle: true,
  }
  mensajeErrorValidacion= {
    nombre_cliente: "",
    pagada: "",
    monto_pago: "",
    carnet_cliente: "",
    celular_cliente: "",
    cantidad_bultos: "",
    detalle: ""
  }

  constructor( 
    private servicioEncomienda:ServicioEncomiendasService,
    private router: Router,
    private route: ActivatedRoute,
    private viajesService:ServicioViajesService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    const id_encomienda = this.route.snapshot.queryParams["id_encomienda"];
    const id_viaje = this.route.snapshot.queryParams["id_viaje"];
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.nombreSindicato = JSON.parse(localStorage.getItem("sindicatos"))[this.sindicatoUsuario-1].nombre;
    this.esEncomiendaNueva = id_encomienda == undefined;
    if(!this.esEncomiendaNueva){
      this.servicioEncomienda.ObtenerEncomienda(id_encomienda).subscribe(encomienda=>{
        if(encomienda.viaje.conductore.id_sindicato===this.sindicatoUsuario){
          this.encomienda=encomienda;
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
    if(this.encomienda.carnet_cliente === null || (action=="registrar" && this.encomienda.carnet_cliente == undefined)){this.mensajeErrorValidacion.carnet_cliente="Carnet necesario"; this.validacion.carnet_cliente = false}else{this.validacion.carnet_cliente =true}
    if(this.encomienda.nombre_cliente === "" || (action=="registrar" && this.encomienda.nombre_cliente) == undefined){this.mensajeErrorValidacion.nombre_cliente="Nombre necesario"; this.validacion.nombre_cliente = false}else{this.validacion.nombre_cliente =true}
    if(this.encomienda.pagada === null || (action=="registrar" && this.encomienda.pagada == undefined)){this.mensajeErrorValidacion.pagada="Estado de pago necesario"; this.validacion.pagada = false}else{this.validacion.pagada =true}
    if(this.encomienda.monto_pago === null || (action=="registrar" && this.encomienda.monto_pago == undefined)){this.mensajeErrorValidacion.monto_pago="Monto de pago necesario"; this.validacion.monto_pago = false}else if(this.encomienda.monto_pago<0){this.mensajeErrorValidacion.monto_pago="Cantidad invalida";this.validacion.monto_pago=false}else{this.validacion.monto_pago =true}
    if(this.encomienda.celular_cliente === null || (action=="registrar" && this.encomienda.celular_cliente == undefined)){this.mensajeErrorValidacion.celular_cliente="Celular necesario"; this.validacion.celular_cliente = false}else if(this.encomienda.celular_cliente<1){this.mensajeErrorValidacion.celular_cliente="Celular invalido";this.validacion.celular_cliente=false}else{this.validacion.celular_cliente =true}
    if(this.encomienda.detalle === "" || (action=="registrar" && this.encomienda.detalle) == undefined){this.mensajeErrorValidacion.detalle="Detalle necesario"; this.validacion.detalle = false}else{this.validacion.detalle =true}
    if(this.encomienda.cantidad_bultos === null || (action=="registrar" && this.encomienda.cantidad_bultos == undefined)){this.mensajeErrorValidacion.cantidad_bultos="Cantidad de bultos necesaria"; this.validacion.cantidad_bultos = false}else if(this.encomienda.cantidad_bultos<1){this.mensajeErrorValidacion.cantidad_bultos="Cantidad invalida";this.validacion.cantidad_bultos=false}else{this.validacion.cantidad_bultos =true}


    const response = this.validacion.carnet_cliente && this.validacion.nombre_cliente && this.validacion.pagada && this.validacion.monto_pago && this.validacion.celular_cliente
    && this.validacion.detalle && this.validacion.cantidad_bultos;
    return response;
  }

  CrearEncomienda(){
    if(this.ValidarCampos("registrar")){
      this.encomienda.id_viaje = this.viaje.id_viaje;
      this.servicioEncomienda.CrearEncomienda(this.encomienda).subscribe(result=>{
        this.sendViaWhatsApp(result);
        this._location.back();
      });
    }
  }

  sendViaWhatsApp(encomiendaNueva:Encomienda) { 
    const urlRecibo = `https://terminalmovima.com/encomiendas/recibo/${encomiendaNueva.id_encomienda}`;
    const urlSeguimiento = `https://terminalmovima.com/encomiendas/seguimiento/${encomiendaNueva.id_encomienda}`;
    const message = `Usted deposito una encomienda${(encomiendaNueva.viaje?.conductore?.sindicato?.nombre=== undefined) ? '' : " en el sindicato: "+encomiendaNueva.viaje?.conductore?.sindicato?.nombre}.%0A%0AUsted puede obtener su recibo digital en el siguiente enlace:%0A${urlRecibo}%0A%0AUsted tambien puede realizar un seguimiento a su encomienda a traves del siguiente enlace:%0A${urlSeguimiento}%0A%0ATenga cuidado de no compartir los enlaces, muchas gracias por su preferencia!`;
    const phoneNumber = `591${this.encomienda.celular_cliente}`; 
    const messageText = message.split(' ').join('%20');
    let finalUrl = 'https://api.whatsapp.com/send?phone=' + phoneNumber + '&text=' + messageText ; 
    window.open(finalUrl, "_blank");
  }

  ActualizarEncomienda(){
    if(this.ValidarCampos("registrar"))
    {
      this.servicioEncomienda.EditarEncomienda(this.encomienda).subscribe(result=>{
        this._location.back();
      });
    }
  }

  Cancelar(){
    this._location.back();
  }

}
