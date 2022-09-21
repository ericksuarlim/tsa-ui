import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anuncio } from 'src/app/modelos/anuncios';
import { ServicioAnunciosService } from 'src/app/servicios/servicio-anuncios.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-formulario-anuncios',
  templateUrl: './formulario-anuncios.component.html',
  styleUrls: ['./formulario-anuncios.component.css']
})
export class FormularioAnunciosComponent implements OnInit {

  anuncio: Anuncio = new Anuncio();
  nuevoAnuncio: boolean = true;
  sindicatoUsuario: number;

  validacion= {
    titulo: true,
    detalle: true,
    celular_referencia: true
  };

  mensajeErrorValidacion= {
    titulo: "",
    detalle: "",
    celular_referencia: ""
  };
  
  constructor(
    private servicioAnuncios:ServicioAnunciosService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id_anuncio = this.route.snapshot.queryParams["id_anuncio"];
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));

    this.nuevoAnuncio = id_anuncio == undefined;
    if(!this.nuevoAnuncio)
    {
      this.servicioAnuncios.ObtenerAnuncio(id_anuncio).subscribe(anuncio=>{
        if(anuncio.id_sindicato===this.sindicatoUsuario){
          this.anuncio=anuncio;
        }
        else
        {
          this.router.navigate(['/']); 
        } 
      });
    }
  }

  ActualizarAnuncio(){
    if(this.ValidarCampos("registrar"))
    {
      this.servicioAnuncios.EditarAnuncio(this.anuncio).subscribe(result=>{
        this._location.back();
      });
    }
  }

  CrearAnuncio(){
    if(this.ValidarCampos("registrar")){
      this.anuncio.fecha = new Date();
      this.anuncio.id_sindicato = 1;
      this.servicioAnuncios.CrearAnuncio(this.anuncio).subscribe(result=>{
        this._location.back();
      });
    }
  }

  Cancelar(){
    this._location.back();
  }

  ValidarCampos(action: string){
    if(this.anuncio.titulo === "" || (action=="registrar" && this.anuncio.titulo) == undefined){this.mensajeErrorValidacion.titulo="Titulo necesario"; this.validacion.titulo = false}else{this.validacion.titulo =true};
    if(this.anuncio.celular_referencia === null || (action=="registrar" && this.anuncio.celular_referencia == undefined)){this.mensajeErrorValidacion.celular_referencia="Celular necesario"; this.validacion.celular_referencia = false}else{this.validacion.celular_referencia =true};
    if(this.anuncio.detalle === "" || (action=="registrar" && this.anuncio.detalle == undefined)){this.mensajeErrorValidacion.detalle="Detalle necesario"; this.validacion.detalle = false}else{this.validacion.detalle =true};

    const response = this.validacion.titulo && this.validacion.detalle && this.validacion.celular_referencia;
    return response;
  }

}
