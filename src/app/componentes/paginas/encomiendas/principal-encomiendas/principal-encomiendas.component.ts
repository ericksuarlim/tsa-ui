import { Component, OnInit } from '@angular/core';
import { Encomienda } from 'src/app/modelos/encomienda';
import { ServicioEncomiendasService } from 'src/app/servicios/servicio-encomiendas.service';

@Component({
  selector: 'app-principal-encomiendas',
  templateUrl: './principal-encomiendas.component.html',
  styleUrls: ['./principal-encomiendas.component.css']
})
export class PrincipalEncomiendasComponent implements OnInit {

  encomiendas: Encomienda[];
  constructor(private servicioEncomiendas:ServicioEncomiendasService,) { }

  ngOnInit(): void {
    this.servicioEncomiendas.ObtenerEncomiendas().subscribe(encomiendas =>{this.encomiendas= encomiendas});

  }

}
