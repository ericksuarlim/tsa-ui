import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  reservasFiltradas: Reserva[];
  esGeneral: boolean= true;
  usuario: string;
  sindicatoUsuario: number;
  sindicatoCargado: string;
  cadenaBusqueda:string;
  parametroBusqueda:string;
  nombreSindicato: string;

  constructor(
    private servicioReservas:ServicioReservasService,
    private router:Router,
    public modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sindicatoCargado = this.route.snapshot.queryParams["id_sindicato"];
    this.esGeneral = this.sindicatoCargado ===undefined;
    this.usuario = localStorage.getItem('usuario');
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.nombreSindicato = this.sindicatoCargado!=undefined? JSON.parse(localStorage.getItem("sindicatos"))[Number(this.sindicatoCargado)-1].nombre:false;

    if(!this.esGeneral){
      this.servicioReservas.ObtenerReservasPorSindicato(Number(this.sindicatoCargado)).subscribe(reservas =>{this.reservas= reservas;this.reservasFiltradas=reservas});
    }
    else{
      this.servicioReservas.ObtenerReservas().subscribe(reservas =>{this.reservas= reservas;this.reservasFiltradas=reservas});
    }
  }

  Filtrar() {
    if(this.cadenaBusqueda!=undefined && this.parametroBusqueda!=undefined){
      const palabras: string[] = this.cadenaBusqueda.toString().toLowerCase().trim().split(' ');
      this.reservasFiltradas = this.reservas.filter((reserva: Reserva) => {
          let encontrado = false;
          palabras.forEach(palabra => {
            if(this.parametroBusqueda==='Fecha')
            {
              if ( String(reserva.fecha).includes(palabra)) {
                encontrado = true;
              }
            }
            else
            {
              if ( String(reserva.nombre_completo_reserva.toLowerCase()).includes(palabra)) {
                encontrado = true;
              }
            }
          });
          return encontrado;
        }
      );
      if(this.reservasFiltradas.length===0){
        this.reservasFiltradas = this.reservas;
      }
    }
  }

  OpcionesReserva(reserva: Reserva){
    let copiaReserva = new Reserva()
    copiaReserva = {...reserva};
    const modalRef = this.modalService.open(ModalOpcionesReservasComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.reserva = copiaReserva;
    // modalRef.componentInstance.actualizar.subscribe((confirm: boolean) => {
    //     window.location.reload();
    // });
  }

  ValidarVista(){
    return this.usuario!=null && !this.esGeneral && this.sindicatoUsuario===Number(this.sindicatoCargado);
  }

}
