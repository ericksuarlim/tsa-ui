import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioReservasService } from 'src/app/servicios/servicio-reservas.service';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';
import {Location} from '@angular/common';
import { Viaje } from 'src/app/modelos/viaje';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOpcionesReservasComponent } from 'src/app/componentes/modals/modal-opciones-reservas/modal-opciones-reservas.component';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.component.html',
  styleUrls: ['./detalle-viaje.component.css']
})
export class DetalleViajeComponent implements OnInit {

  viaje: Viaje = new Viaje();
  esGeneral: boolean= true;
  permisoBotones: boolean;
  sindicatoCargado: number;
  usuario: string;
  sindicatoUsuario: number;
  constructor(
    private servicioViajes: ServicioViajesService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
    private servicioReservas:ServicioReservasService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    const id_viaje = this.route.snapshot.params["id_viaje"];
    this.sindicatoCargado = Number(this.route.snapshot.queryParams["id_sindicato"]);
    this.esGeneral = this.sindicatoCargado === undefined;
    this.usuario = localStorage.getItem('nombre_usuario');
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.servicioViajes.ObtenerViaje(id_viaje).subscribe(viaje=>{
      this.viaje=viaje;
      this.permisoBotones = viaje.conductore.id_sindicato === this.sindicatoUsuario;
    });
  }

  Atras(){
    this._location.back();
  }

  Editar(id_viaje:number){
    this.router.navigate(["/viajes/formulario"], { queryParams: { id_viaje} });
  }

  AbrirPasaje(id_pasaje:number){
    this.router.navigate([`/pasajes/recibo/${id_pasaje}`], { queryParams: { id_sindicato:this.sindicatoCargado }})
  }

  VerEncomienda(id_encomienda: number){
    // this.router.navigateByUrl(`/encomiendas/seguimiento/${id_encomienda}`);
    this.router.navigate([`/encomiendas/seguimiento/${id_encomienda}`], { queryParams: { id_sindicato:this.sindicatoCargado }})

  }

  OpcionesReserva(id_reserva: number){
    
    this.servicioReservas.ObtenerReserva(id_reserva).subscribe(reserva =>{
      const modalRef = this.modalService.open(ModalOpcionesReservasComponent, { size: 'xl', backdrop: 'static' });
      modalRef.componentInstance.reserva = reserva;
    });
  }

  ValidarVista(){
    return this.usuario!=null && !this.esGeneral && this.sindicatoUsuario===this.sindicatoCargado && this.permisoBotones;  
  }

  ValidarPrivacidad(){
    return this.usuario!=null;
  }
}
