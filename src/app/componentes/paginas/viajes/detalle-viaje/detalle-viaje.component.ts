import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioEncomiendasService } from 'src/app/servicios/servicio-encomiendas.service';
import { ServicioPasajesService } from 'src/app/servicios/servicio-pasajes.service';
import { ServicioReservasService } from 'src/app/servicios/servicio-reservas.service';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';
import {Location} from '@angular/common';
import { Viaje } from 'src/app/modelos/viaje';
import { Reserva } from 'src/app/modelos/reserva';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOpcionesReservasComponent } from 'src/app/componentes/modals/modal-opciones-reservas/modal-opciones-reservas.component';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.component.html',
  styleUrls: ['./detalle-viaje.component.css']
})
export class DetalleViajeComponent implements OnInit {

  viaje: Viaje = new Viaje();
  constructor(
    private servicioViajes: ServicioViajesService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
    private servicioReservas:ServicioReservasService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    const id_viaje = this.route.snapshot.params["id_viaje"];
    this.servicioViajes.ObtenerViaje(id_viaje).subscribe(viaje=>{this.viaje=viaje});
  }

  Atras(){
    this._location.back();
  }

  Editar(id_viaje:number){
    this.router.navigate(["/viajes/formulario"], { queryParams: { id_viaje} });
  }

  VerRecibo(id_viaje:number){
    this.router.navigateByUrl(`/viajes/recibo/${id_viaje}`);
  }

  AbrirPasaje(id_pasaje:number){
    this.router.navigateByUrl(`/pasajes/recibo/${id_pasaje}`);
  }

  VerEncomienda(id_encomienda: number){
    this.router.navigateByUrl(`/encomiendas/seguimiento/${id_encomienda}`);
  }

  OpcionesReserva(id_reserva: number){
    
    this.servicioReservas.ObtenerReserva(id_reserva).subscribe(reserva =>{
      
      // modalRef.componentInstance.actualizar.subscribe((confirm: boolean) => {
      //     window.location.reload();
      // });
      const modalRef = this.modalService.open(ModalOpcionesReservasComponent, { size: 'xl', backdrop: 'static' });
      modalRef.componentInstance.reserva = reserva;
    });
    // let copiaReserva = new Reserva()
    // copiaReserva = {...reserva};
    // const modalRef = this.modalService.open(ModalOpcionesReservasComponent, { size: 'xl', backdrop: 'static' });
    // modalRef.componentInstance.reserva = copiaReserva;
    
  }
}
