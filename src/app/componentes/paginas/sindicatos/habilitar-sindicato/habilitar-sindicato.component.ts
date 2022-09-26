import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioSindicatosService } from 'src/app/servicios/servicio-sindicatos.service';
import {Location} from '@angular/common';
import { Sindicato } from 'src/app/modelos/sindicato';

@Component({
  selector: 'app-habilitar-sindicato',
  templateUrl: './habilitar-sindicato.component.html',
  styleUrls: ['./habilitar-sindicato.component.css']
})
export class HabilitarSindicatoComponent implements OnInit {

  sindicato: Sindicato= new Sindicato();
  sindicatos: Sindicato[]
  constructor(
    private _location: Location,
    private sindicatosService:ServicioSindicatosService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sindicatosService.ObtenerSindicatos().subscribe(sindicatos=>{this.sindicatos=sindicatos})
  }

  CambiarEstado(){
    this.sindicatosService.ActivarSindicato(this.sindicato.id_sindicato).subscribe(()=>{
      this._location.back();
    })
  }

  Cancelar(){
    this._location.back();
  }

}
