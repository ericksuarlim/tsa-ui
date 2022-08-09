import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Conductor } from 'src/app/modelos/conductor';
import { Reserva } from 'src/app/modelos/reserva';
import { Viaje } from 'src/app/modelos/viaje';
import { ServicioConductoresService } from 'src/app/servicios/servicio-conductores.service';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';

@Component({
  selector: 'app-modal-opciones-reservas',
  templateUrl: './modal-opciones-reservas.component.html',
  styleUrls: ['./modal-opciones-reservas.component.css']
})
export class ModalOpcionesReservasComponent implements OnInit {

  reserva: Reserva = new Reserva();
  @Output() actualizar: EventEmitter<boolean>  = new EventEmitter();
  conductores: Conductor[];
  viajes: Viaje[];
  validacion= {
    id_viaje: true
  }

  mensajeErrorValidacion= {
    viaje: "",
  }
  
  constructor(
    private activeModal: NgbActiveModal,
    private servicioConductores: ServicioConductoresService,
    private viajesService:ServicioViajesService
    ) { }

  ngOnInit(): void {
    this.servicioConductores.ObtenerConductores().subscribe(conductores =>{
      this.conductores = conductores;
    })
    if(this.reserva.id_viaje===null)
    {
      console.log(this.reserva.id_sindicato)
      this.viajesService.ObtenerViajes().subscribe(viajes=>{
        this.viajes = viajes.filter((v:Viaje)=>{return (v.turno?.fecha=== this.reserva.fecha && v.turno?.id_sindicato ===this.reserva.id_sindicato && v.disponibilidad >= this.reserva.cantidad)}) 
        console.log(this.viajes); 
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

    const response = this.validacion.id_viaje;
   
    return response;
  }

  SeleccionarViaje(id_viaje:number){
    this.reserva.id_viaje = id_viaje;
    this.ValidarReserva("verificar");
  }

  async Actualizar(){
    console.log("Reserva", this.reserva)
    // this.actualizar.emit(true);
    // this.activeModal.close();
  }

  async Cancelar(){
    this.actualizar.emit(false);
    this.activeModal.close(); 
  }

}
