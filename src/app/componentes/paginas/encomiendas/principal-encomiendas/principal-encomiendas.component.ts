import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOpcionesCreacionComponent } from 'src/app/componentes/modals/modal-opciones-creacion/modal-opciones-creacion.component';
import { Encomienda } from 'src/app/modelos/encomienda';
import { ServicioEncomiendasService } from 'src/app/servicios/servicio-encomiendas.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-principal-encomiendas',
  templateUrl: './principal-encomiendas.component.html',
  styleUrls: ['./principal-encomiendas.component.css']
})
export class PrincipalEncomiendasComponent implements OnInit {

  encomiendas: Encomienda[];
  encomiendasFiltradas: Encomienda[];
  esGeneral: boolean= true;
  usuario: string;
  sindicatoUsuario: number;
  sindicatoCargado: string;
  cadenaBusqueda:string;
  parametroBusqueda:string;
  nombreSindicato: string;

  constructor(
    private servicioEncomiendas:ServicioEncomiendasService,
    private router: Router,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    location: Location
  ) { 
    location.onUrlChange(()=>{window.location.reload()})
  }

  ngOnInit(): void {
    this.sindicatoCargado = this.route.snapshot.queryParams["id_sindicato"];
    this.esGeneral = this.sindicatoCargado === undefined;
    this.usuario = localStorage.getItem('nombre_usuario');
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.nombreSindicato = this.sindicatoCargado!=undefined? JSON.parse(localStorage.getItem("sindicatos"))[Number(this.sindicatoCargado)-1].nombre:false;

    if(!this.esGeneral){
      this.servicioEncomiendas.ObtenerEncomiendasPorSindicato(Number(this.sindicatoCargado)).subscribe(encomiendas =>{this.encomiendas= encomiendas; this.encomiendasFiltradas=encomiendas});
    }
    else{
      this.servicioEncomiendas.ObtenerEncomiendas().subscribe(encomiendas =>{this.encomiendas= encomiendas; this.encomiendasFiltradas=encomiendas});
    }
  }

  Filtrar() {
    if(this.cadenaBusqueda!=undefined && this.parametroBusqueda!=undefined){
      const palabras: string[] = this.cadenaBusqueda.toString().toLowerCase().trim().split(' ');
      this.encomiendasFiltradas = this.encomiendas.filter((encomienda: Encomienda) => {
          let encontrado = false;
          palabras.forEach(palabra => {
            if(String(encomienda.viaje.fecha).includes(palabra) || String(encomienda.nombre_cliente.toLowerCase()).includes(palabra) || String(encomienda.id_encomienda).includes(palabra))
            {
              encontrado = true;
            }
          });
          return encontrado;
        }
      );
      if(this.encomiendasFiltradas.length!=1){
        this.encomiendasFiltradas = this.encomiendas;
      }
    }
    else{
      this.encomiendasFiltradas = this.encomiendas;
    }

  }

  VerEncomienda(id_encomienda: number){
    this.router.navigate([`/encomiendas/seguimiento/${id_encomienda}`], { queryParams: { id_sindicato:this.sindicatoCargado }})
  }

  RedirigirCrearEncomienda(){
    this.modalService.open(ModalOpcionesCreacionComponent);
  }

  ValidarVista(){
    return this.usuario!=null && !this.esGeneral && this.sindicatoUsuario===Number(this.sindicatoCargado);
  }

  ValidadPrivacidad(){
    return this.usuario!=null;
  }

}
