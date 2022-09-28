import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Turno } from 'src/app/modelos/turno';
import { ServicioTurnosService } from 'src/app/servicios/servicio-turnos.service';

@Component({
  selector: 'app-principal-turnos',
  templateUrl: './principal-turnos.component.html',
  styleUrls: ['./principal-turnos.component.css']
})
export class PrincipalTurnosComponent implements OnInit {

  turnos: Turno[];
  turnosFiltrados: Turno[];
  usuario: string;
  sindicatoUsuario: number;
  sindicatoCargado: number;
  cadenaBusqueda:string;
  parametroBusqueda:string;
  nombreSindicato: string;


  constructor(
    private servicioTurnos: ServicioTurnosService,
    private router:Router,
    public modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sindicatoCargado = Number(this.route.snapshot.queryParams["id_sindicato"]);
    this.usuario = localStorage.getItem('nombre_usuario');
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.nombreSindicato = this.sindicatoCargado!=undefined? JSON.parse(localStorage.getItem("sindicatos"))[Number(this.sindicatoCargado)-1].nombre:false;
    if(this.sindicatoCargado===this.sindicatoUsuario){
      this.servicioTurnos.ObtenerTurnosPorSindicato(this.sindicatoCargado).subscribe(turnos =>{this.turnos= turnos;this.turnosFiltrados=turnos});
    }
    else{
      this.router.navigate(['/']);
    }

  }

  Filtrar() {
    if(this.cadenaBusqueda!=undefined && this.parametroBusqueda!=undefined){
      const palabras: string[] = this.cadenaBusqueda.toString().toLowerCase().trim().split(' ');
      this.turnosFiltrados = this.turnos.filter((turno: Turno) => {
          let encontrado = false;
          palabras.forEach(palabra => {
            if(String(turno.fecha).includes(palabra) ||  String(turno.id_turno).includes(palabra))
            {
              encontrado = true;
            }
          });
          return encontrado;
        }
      );
      if(this.turnosFiltrados.length===0){
        this.turnosFiltrados = this.turnos;
      }
    }   
  }

  editarTurno(id_turno: number){
    this.router.navigate(["/turnos/formulario"], { queryParams: { id_turno } });
  }

  verTurno(id_turno: number){
    this.router.navigate([`/turnos/${id_turno}/detalles-turno`], { queryParams: { id_sindicato:this.sindicatoCargado }})
  }

  ValidarVista(){
    return this.usuario!=null && this.sindicatoUsuario===this.sindicatoCargado;
  }

}
