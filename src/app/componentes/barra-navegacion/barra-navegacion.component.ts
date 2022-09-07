import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOpcionesAdministradorComponent } from '../modals/modal-opciones-administrador/modal-opciones-administrador.component';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  constructor(
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  AbrirModalAdministrador(){

    const modalRef = this.modalService.open(ModalOpcionesAdministradorComponent);
  }

}
