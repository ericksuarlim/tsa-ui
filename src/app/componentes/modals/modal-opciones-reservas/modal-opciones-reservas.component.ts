import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  sindicato: string;
  id_sindicato: string;

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
    this.id_sindicato = this.route.snapshot.queryParams["id_sindicato"];
    this.esGeneral = this.id_sindicato === undefined;
    this.usuario = localStorage.getItem('nombre_usuario');
    this.sindicato = localStorage.getItem('id_sindicato_usuario');
    if(this.reserva.id_viaje===null)
    {
      this.sinViaje = true;
      this.viajesService.ObtenerViajes().subscribe(viajes=>{
        this.viajes = viajes.filter((v:Viaje)=>{return (v.turno?.fecha=== this.reserva.fecha && v.turno?.id_sindicato ===this.reserva.id_sindicato && v.disponibilidad >= this.reserva.cantidad)}) 
      })
    }
    else{
      this.viajesService.ObtenerViajes().subscribe(viajes=>{
        this.viajes = viajes.filter((v:Viaje)=>{return (v.id_viaje===this.reserva.id_viaje)});
      })
    }
  }

  ValidarReserva(action:String):boolean{
    if((this.reserva.id_viaje === null && this.viajes?.length>0) || ((action=="registrar" && this.reserva.id_viaje == undefined && this.viajes?.length>0))){this.mensajeErrorValidacion.viaje="Se debe de seleccionar un viaje"; this.validacion.id_viaje = false}else{this.validacion.id_viaje =true};
    if(this.reserva.estado ==="Pendiente"){this.mensajeErrorValidacion.estado="Para actualizar debe de cambiar el estado"; this.validacion.estado = false}else{this.validacion.estado =true};
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
        // this.actualizar.emit(true);
        // this.activeModal.close();
        // console.log("Entro")
        this.activeModal.close(); 
        window.location.reload(); 
      });
    }
  }

  Cancelar(){
    //this.actualizar.emit(false);
    this.activeModal.close(); 
  }

  ValidarVista(){
    return this.usuario!=null && !this.esGeneral && this.sindicato===this.id_sindicato;
  }

}
