import { Component, OnInit } from '@angular/core';
import { Sindicato } from 'src/app/modelos/sindicato';
import {Location} from '@angular/common';
import { ServicioSindicatosService } from 'src/app/servicios/servicio-sindicatos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-sindicato',
  templateUrl: './formulario-sindicato.component.html',
  styleUrls: ['./formulario-sindicato.component.css']
})
export class FormularioSindicatoComponent implements OnInit {

  sindicato: Sindicato = new Sindicato();
  sindicatoNuevo: boolean = true;
  validacion= {
    nombre:true,
    estado: true,
    ciudad: true,
  }
  mensajeErrorValidacion= {
    nombre: "",
    estado: "",
    ciudad: "",
  }

  constructor(
    private _location: Location,
    private sindicatosServices:ServicioSindicatosService,
    private router:Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id_sindicato = this.route.snapshot.queryParams["id_sindicato"];
    this.sindicatoNuevo = id_sindicato === undefined;
    if(!this.sindicatoNuevo){
      this.sindicatosServices.ObtenerSindicato(id_sindicato).subscribe(sindicato=>{this.sindicato=sindicato})
    }
  }

  CrearSindicato(){
    if(this.ValidarCampos('registrar')){
      this.sindicatosServices.CrearSindicato(this.sindicato).subscribe(result=>{
        this.router.navigate(['/sindicatos']);
      })
    }
  }

  ValidarCampos(action:string){
    if(this.sindicato.nombre === "" || (action=="registrar" && this.sindicato.nombre == undefined)){this.mensajeErrorValidacion.nombre="Nombre necesario"; this.validacion.nombre = false}else{this.validacion.nombre =true};
    if(this.sindicato.ciudad === "" || (action=="registrar" && this.sindicato.ciudad == undefined)){this.mensajeErrorValidacion.ciudad="Ciudad necesaria"; this.validacion.ciudad = false}else{this.validacion.ciudad =true};
    if(this.sindicato.estado === null || (action=="registrar" && this.sindicato.estado == undefined)){this.mensajeErrorValidacion.estado="Estado necesario"; this.validacion.estado = false}else{this.validacion.estado =true};

    const response = this.validacion.nombre && this.validacion.estado && this.validacion.ciudad;
    return response;
  }

  ActualizarSindicato(){
    if(this.ValidarCampos('registrar')){
      this.sindicatosServices.EditarSindicato(this.sindicato).subscribe(result=>{
        this.router.navigate(['/sindicatos']);

      })
    }
  }

  Cancelar(){
    this._location.back();
  }
}
