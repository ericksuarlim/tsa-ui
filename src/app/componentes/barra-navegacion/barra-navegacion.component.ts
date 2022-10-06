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

  usuario: string;
  rol: string;
  sindicatoUsuario: number;
  nombreSindicato: string;

  constructor(
    public modalService: NgbModal,
    private autenticacionService: ServicioAutenticacionService,
    private _location: Location,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('nombre_usuario');
    this.rol = localStorage.getItem('rol_usuario');
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    if(this.sindicatoUsuario){
      this.nombreSindicato = JSON.parse(localStorage.getItem("sindicatos"))[Number(this.sindicatoUsuario)-1].nombre;
    }
  }

  AbrirModalAdministrador(){
    this.modalService.open(ModalOpcionesAdministradorComponent, { size: 'lg'});
  }

  CerrarSesion(){
    const datos ={nombre_usuario: localStorage.getItem('nombre_usuario')}
    this.autenticacionService.Salir(datos).subscribe((resultado)=>{
      localStorage.clear();
      this.router.navigateByUrl(`/`).then(() => {
        window.location.reload();
      });
    })
  }

  AbrirServicioSindicatos(id_sindicato:number){
    this.router.navigate(["servicio-sindicato"], { queryParams: { id_sindicato } }).then(() => {
      window.location.reload();
    });
  }



}
