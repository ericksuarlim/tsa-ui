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
  esGeneral: boolean= true;
  usuario: string;
  sindicatoUsuario: number;
  sindicatoCargado: string;
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
    if(!this.esGeneral){
      this.servicioViajes.ObtenerViajesPorSindicato(Number(this.sindicatoCargado)).subscribe(viajes =>{this.viajes= viajes});
    }
    else
    {
      this.servicioViajes.ObtenerViajes().subscribe(viajes =>{this.viajes= viajes});
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
