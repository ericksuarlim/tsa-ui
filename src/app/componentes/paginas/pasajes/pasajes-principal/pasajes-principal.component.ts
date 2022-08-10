import { Component, OnInit } from '@angular/core';
import { Pasaje } from 'src/app/modelos/pasaje';
import { ServicioPasajesService } from 'src/app/servicios/servicio-pasajes.service';

@Component({
  selector: 'app-pasajes-principal',
  templateUrl: './pasajes-principal.component.html',
  styleUrls: ['./pasajes-principal.component.css']
})
export class PasajesPrincipalComponent implements OnInit {

  pasajes: Pasaje[];
  constructor(
    private servicioPasajes:ServicioPasajesService,
  ) { }

  ngOnInit(): void {
    this.servicioPasajes.ObtenerPasajes().subscribe(pasajes=>{this.pasajes = pasajes})
  }

}
