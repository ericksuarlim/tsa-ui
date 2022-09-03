import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOpcionesCreacionComponent } from 'src/app/componentes/modals/modal-opciones-creacion/modal-opciones-creacion.component';
import { Pasaje } from 'src/app/modelos/pasaje';
import { ServicioPasajesService } from 'src/app/servicios/servicio-pasajes.service';

@Component({
  selector: 'app-pasajes-principal',
  templateUrl: './pasajes-principal.component.html',
  styleUrls: ['./pasajes-principal.component.css']
})
export class PasajesPrincipalComponent implements OnInit {

  pasajes: Pasaje[];
  constructor(
    private servicioPasajes:ServicioPasajesService,
    private router:Router,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.servicioPasajes.ObtenerPasajes().subscribe(pasajes=>{this.pasajes = pasajes})
  }

  AbrirPasaje(id_pasaje:number){
    this.router.navigateByUrl(`/pasajes/recibo/${id_pasaje}`);
  }

  EditarPasajes(id_pasaje:number,id_viaje:number){
    this.router.navigate(["/pasajes/formulario"], { queryParams: { id_pasaje, id_viaje } });
  }

  RedirigirCrearPasaje(){
    this.modalService.open(ModalOpcionesCreacionComponent);

  }

}
