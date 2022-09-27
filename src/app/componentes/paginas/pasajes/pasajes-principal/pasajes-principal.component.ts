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
  pasajesFiltrados: Pasaje[];
  usuario: string;
  sindicatoUsuario: number;
  sindicatoCargado: string;
  cadenaBusqueda:string;
  parametroBusqueda:string;
  nombreSindicato: string;

  constructor(
    private servicioPasajes:ServicioPasajesService,
    private router:Router,
    public modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sindicatoCargado = this.route.snapshot.queryParams["id_sindicato"];
    this.usuario = localStorage.getItem('nombre_usuario');
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.nombreSindicato = this.sindicatoCargado!=undefined? JSON.parse(localStorage.getItem("sindicatos"))[Number(this.sindicatoCargado)-1].nombre:false;

    if(Number(this.sindicatoCargado)===this.sindicatoUsuario){
      this.servicioPasajes.ObtenerPasajesPorSindicato(Number(this.sindicatoCargado)).subscribe(pasajes=>{this.pasajes = pasajes;this.pasajesFiltrados=pasajes})
    }
    else{
      this.router.navigate(['/']);
    }
  }

  Filtrar() {
    if(this.cadenaBusqueda!=undefined && this.parametroBusqueda!=undefined){
      const palabras: string[] = this.cadenaBusqueda.toString().toLowerCase().trim().split(' ');
      this.pasajesFiltrados = this.pasajes.filter((pasaje: Pasaje) => {
          let encontrado = false;
          palabras.forEach(palabra => {
            if(String(pasaje.viaje.fecha).includes(palabra) || String(pasaje.nombre_completo.toLowerCase()).includes(palabra))
            {
                encontrado = true;
            }
          });
          return encontrado;
        }
      );
      if(this.pasajesFiltrados.length===0){
        this.pasajesFiltrados = this.pasajes;
      }
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
    return this.usuario!=null && this.sindicatoUsuario===Number(this.sindicatoCargado);
  }

}
