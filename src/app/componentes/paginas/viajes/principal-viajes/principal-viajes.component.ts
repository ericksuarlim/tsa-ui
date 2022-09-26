import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  viajesFiltrados: Viaje[];
  esGeneral: boolean= true;
  usuario: string;
  sindicatoUsuario: number;
  sindicatoCargado: string;
  cadenaBusqueda:string;
  parametroBusqueda:string;
  nombreSindicato: string;

  constructor(
    private servicioViajes:ServicioViajesService,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.sindicatoCargado = this.route.snapshot.queryParams["id_sindicato"];
    this.esGeneral = this.sindicatoCargado=== undefined;
    this.usuario = localStorage.getItem('nombre_usuario');
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.nombreSindicato = this.sindicatoCargado!=undefined? JSON.parse(localStorage.getItem("sindicatos"))[Number(this.sindicatoCargado)-1].nombre:false;
    if(!this.esGeneral){
      this.servicioViajes.ObtenerViajesPorSindicato(Number(this.sindicatoCargado)).subscribe(viajes =>{this.viajes= viajes;this.viajesFiltrados = this.viajes;});
    }
    else
    {
      this.servicioViajes.ObtenerViajes().subscribe(viajes =>{this.viajes= viajes;this.viajesFiltrados = this.viajes;});
    }
  }

  Filtrar() {
    if(this.cadenaBusqueda!=undefined && this.parametroBusqueda!=undefined){
      const palabras: string[] = this.cadenaBusqueda.toString().toLowerCase().trim().split(' ');
      this.viajesFiltrados = this.viajes.filter((viaje: Viaje) => {
          let encontrado = false;
          palabras.forEach(palabra => {
            if(this.parametroBusqueda==='Fecha')
            {
              if ( String(viaje.fecha).includes(palabra)) {
                encontrado = true;
              }
            }
            else
            {
              if ( String(viaje.conductore.nombre.toLowerCase()).includes(palabra)) {
                encontrado = true;
              }
            }
          });
          return encontrado;
        }
      );
      if(this.viajesFiltrados.length===0){
        this.viajesFiltrados = this.viajes;
      }
    }   
  }


  opcionesViaje(viaje:Viaje){
    let copiaViaje = new Viaje()
    copiaViaje = {...viaje};
    const modalRef = this.modalService.open(ModalOpcionesViajesComponent, { size: 'lg'});
    modalRef.componentInstance.viaje = copiaViaje;
  }

  VerViaje(id_viaje:number){
    this.router.navigate([`/viajes/${id_viaje}`], { queryParams: { id_sindicato:this.sindicatoCargado }})
  }

  ValidarVista(){
    return this.usuario!=null && !this.esGeneral && this.sindicatoUsuario===Number(this.sindicatoCargado);
  }

}
