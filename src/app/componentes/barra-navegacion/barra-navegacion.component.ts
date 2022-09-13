import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicioAutenticacionService } from 'src/app/servicios/servicio-autenticacion.service';
import { ModalOpcionesAdministradorComponent } from '../modals/modal-opciones-administrador/modal-opciones-administrador.component';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  constructor(
    public modalService: NgbModal,
    private autenticacionService: ServicioAutenticacionService,
    private _location: Location,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  AbrirModalAdministrador(){
    const modalRef = this.modalService.open(ModalOpcionesAdministradorComponent, { size: 'lg'});
  }

  CerrarSesion(){
    const datos ={nombre_usuario: localStorage.getItem('usuario')}
    this.autenticacionService.Salir(datos).subscribe((resultado)=>{
      localStorage.clear();
      this.router.navigateByUrl(`/`);
    })
  }



}
