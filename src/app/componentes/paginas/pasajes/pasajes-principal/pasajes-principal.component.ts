import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  usuario: string;
  sindicatoUsuario: number;
  sindicatoCargado: number;

  constructor(
    private servicioPasajes:ServicioPasajesService,
    private router:Router,
    public modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sindicatoCargado = Number(this.route.snapshot.queryParams["id_sindicato"]);
    this.usuario = localStorage.getItem('usuario');
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    if(this.sindicatoCargado===this.sindicatoUsuario){
      this.servicioPasajes.ObtenerPasajesPorSindicato(this.sindicatoCargado).subscribe(pasajes=>{this.pasajes = pasajes})
    }
    else{
      this.router.navigate(['/']);
    }
  }

  AbrirPasaje(id_pasaje:number){
    this.router.navigate([`/pasajes/recibo/${id_pasaje}`], { queryParams: { id_sindicato:this.sindicatoCargado }})
  }

  EditarPasajes(id_pasaje:number,id_viaje:number){
    this.router.navigate(["/pasajes/formulario"], { queryParams: { id_pasaje, id_viaje } });
  }

  RedirigirCrearPasaje(){
    this.modalService.open(ModalOpcionesCreacionComponent);
  }

  ValidarVista(){
    return this.usuario!=null && this.sindicatoUsuario===this.sindicatoCargado;
  }

}
