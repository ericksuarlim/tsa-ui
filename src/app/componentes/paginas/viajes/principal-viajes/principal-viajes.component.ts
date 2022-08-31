import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOpcionesViajesComponent } from 'src/app/componentes/modals/modal-opciones-viajes/modal-opciones-viajes.component';
import { Viaje } from 'src/app/modelos/viaje';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';

@Component({
  selector: 'app-principal-viajes',
  templateUrl: './principal-viajes.component.html',
  styleUrls: ['./principal-viajes.component.css']
})
export class PrincipalViajesComponent implements OnInit {

  viajes: Viaje[];
  constructor(
    private servicioViajes:ServicioViajesService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.servicioViajes.ObtenerViajes().subscribe(viajes =>{this.viajes= viajes});
  }

  opcionesViaje(viaje:Viaje){
    let copiaViaje = new Viaje()
    copiaViaje = {...viaje};
    const modalRef = this.modalService.open(ModalOpcionesViajesComponent);
    modalRef.componentInstance.viaje = copiaViaje;
  }

}
