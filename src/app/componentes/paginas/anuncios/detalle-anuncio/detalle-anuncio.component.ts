import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioAnunciosService } from 'src/app/servicios/servicio-anuncios.service';
import {Location} from '@angular/common';
import { Anuncio } from 'src/app/modelos/anuncios';


@Component({
  selector: 'app-detalle-anuncio',
  templateUrl: './detalle-anuncio.component.html',
  styleUrls: ['./detalle-anuncio.component.css']
})
export class DetalleAnuncioComponent implements OnInit {

  anuncio: Anuncio = new Anuncio();
  esGeneral: boolean= true;
  permisoBotones: boolean;
  sindicatoCargado: number;
  usuario: string;
  sindicatoUsuario: number;

  constructor(
    private servicioAnuncio:ServicioAnunciosService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id_anuncio = this.route.snapshot.params["id_anuncio"];
    this.sindicatoCargado = Number(this.route.snapshot.queryParams["id_sindicato"]);
    this.esGeneral = this.sindicatoCargado === undefined;
    this.usuario = localStorage.getItem('nombre_usuario');
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.servicioAnuncio.ObtenerAnuncio(id_anuncio).subscribe(anuncio=>{
      this.anuncio=anuncio;
      this.permisoBotones = anuncio.id_sindicato === this.sindicatoUsuario;
    });
  }

  Atras(){
    this._location.back();
  }

  EditarAnuncio(id_anuncio:number){
    this.router.navigate(["/anuncios/formulario"], { queryParams: { id_anuncio} });
  }

  ValidarVista(){
    return this.usuario!=null && !this.esGeneral && this.sindicatoUsuario===this.sindicatoCargado && this.permisoBotones;  
  }

}
