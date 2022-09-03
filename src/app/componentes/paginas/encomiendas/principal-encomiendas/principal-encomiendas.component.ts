import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOpcionesCreacionComponent } from 'src/app/componentes/modals/modal-opciones-creacion/modal-opciones-creacion.component';
import { Encomienda } from 'src/app/modelos/encomienda';
import { ServicioEncomiendasService } from 'src/app/servicios/servicio-encomiendas.service';

@Component({
  selector: 'app-principal-encomiendas',
  templateUrl: './principal-encomiendas.component.html',
  styleUrls: ['./principal-encomiendas.component.css']
})
export class PrincipalEncomiendasComponent implements OnInit {

  encomiendas: Encomienda[];
  constructor(
    private servicioEncomiendas:ServicioEncomiendasService,
    private router: Router,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.servicioEncomiendas.ObtenerEncomiendas().subscribe(encomiendas =>{this.encomiendas= encomiendas});

  }

  VerEncomienda(id_encomienda: number){
    this.router.navigateByUrl(`/encomiendas/seguimiento/${id_encomienda}`);
  }

  RedirigirCrearEncomienda(){
    this.modalService.open(ModalOpcionesCreacionComponent);
  }

}
