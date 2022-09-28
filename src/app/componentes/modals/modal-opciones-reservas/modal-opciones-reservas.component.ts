import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Conductor } from 'src/app/modelos/conductor';
import { Reserva } from 'src/app/modelos/reserva';
import { Viaje } from 'src/app/modelos/viaje';
import { ServicioReservasService } from 'src/app/servicios/servicio-reservas.service';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';

@Component({
  selector: 'app-modal-opciones-reservas',
  templateUrl: './modal-opciones-reservas.component.html',
  styleUrls: ['./modal-opciones-reservas.component.css']
})
export class ModalOpcionesReservasComponent implements OnInit {

  reserva: Reserva = new Reserva();
  // @Output() actualizar: EventEmitter<boolean>  = new EventEmitter();
  conductores: Conductor[];
  viajes: Viaje[];
  sinViaje: boolean;
  esGeneral: boolean= true;
  usuario: string;
  sindicatoUsuario: number;
  sindicatoCargado: number;
  estadoPasado: string;

  validacion= {
    estado: true,
    id_viaje: true
  }

  mensajeErrorValidacion= {
    estado: "",
    viaje: "",
  }
  
  constructor(
    private activeModal: NgbActiveModal,
    private viajesService:ServicioViajesService,
    private reservasService: ServicioReservasService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    if(this.reserva.id_sindicato!= null){
      this.sindicatoCargado = this.reserva.id_sindicato;
    }
    else
    {
      this.sindicatoCargado = this.reserva.viaje.conductore.id_sindicato;
    }
    this.estadoPasado = this.reserva.estado;
    this.esGeneral = this.sindicatoCargado === undefined;
    this.usuario = localStorage.getItem('nombre_usuario');
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    if(this.reserva.id_viaje===null)
    {
      this.sinViaje = true;
      this.viajesService.ObtenerViajes().subscribe(viajes=>{
        this.viajes = viajes.filter((v:Viaje)=>{
          return (v.fecha=== this.reserva.fecha && v.conductore?.id_sindicato ===this.reserva.id_sindicato && v.disponibilidad >= this.reserva.cantidad)}) 
        
      })
    }
    else{
      this.viajesService.ObtenerViajes().subscribe(viajes=>{
        this.viajes = viajes.filter((v:Viaje)=>{return (v.id_viaje===this.reserva.id_viaje)});
      })
    }
  }

  ValidarReserva(action:string):boolean{
    if((this.reserva.id_viaje === null && this.viajes?.length>0) || (action=="registrar" && this.reserva.id_viaje == undefined && this.viajes?.length>0)){this.mensajeErrorValidacion.viaje="Se debe de seleccionar un viaje"; this.validacion.id_viaje = false}else{this.validacion.id_viaje =true}
    if(this.reserva.estado ==="Pendiente"){this.mensajeErrorValidacion.estado="Para actualizar debe de cambiar el estado"; this.validacion.estado = false}else{this.validacion.estado =true}
    const response = this.validacion.id_viaje && this.validacion.estado;
    return response;
  }

  SeleccionarViaje(id_viaje:number){
    this.reserva.id_viaje = id_viaje;
    this.ValidarReserva("verificar");
  }

  Actualizar(){
    if(this.ValidarReserva("registrar")){
      if(this.sinViaje)
      { 
        this.reserva.id_sindicato = this.reserva.sindicato.id_sindicato;
      }
      else{
        this.reserva.id_sindicato = this.reserva.viaje.conductore.id_sindicato;
      }
      this.reservasService.EditarReserva(this.reserva).subscribe(()=>{
        this.activeModal.close(); 
        window.location.reload(); 
      });
    }
  }

  Cancelar(){
    this.activeModal.close(); 
  }

  ValidarVista(){
    return this.usuario!=null && !this.esGeneral && this.sindicatoUsuario===this.sindicatoCargado;
  }

}
