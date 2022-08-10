import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOpcionesReservasComponent } from 'src/app/componentes/modals/modal-opciones-reservas/modal-opciones-reservas.component';
import { Reserva } from 'src/app/modelos/reserva';
import { ServicioReservasService } from 'src/app/servicios/servicio-reservas.service';

@Component({
  selector: 'app-principal-reservas',
  templateUrl: './principal-reservas.component.html',
  styleUrls: ['./principal-reservas.component.css']
})
export class PrincipalReservasComponent implements OnInit {

  reservas: Reserva[];
  constructor(
    private servicioReservas:ServicioReservasService,
    private router:Router,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.servicioReservas.ObtenerReservas().subscribe(reservas =>{this.reservas= reservas});
  }

  opcionesReserva(reserva: Reserva){
    const modalRef = this.modalService.open(ModalOpcionesReservasComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.reserva = reserva;
    modalRef.componentInstance.actualizar.subscribe((confirm: boolean) => {
        window.location.reload();
    });
  }

}
