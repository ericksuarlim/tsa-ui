import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-servicios-sindicatos',
  templateUrl: './servicios-sindicatos.component.html',
  styleUrls: ['./servicios-sindicatos.component.css']
})
export class ServiciosSindicatosComponent implements OnInit {

  usuario: string;
  rol: string;
  sindicato: string;
  id_sindicato: string;
  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('nombre_usuario');
    this.rol = localStorage.getItem('rol_usuario');
    this.sindicato = localStorage.getItem('id_sindicato_usuario')
    this.id_sindicato = this.route.snapshot.queryParams["id_sindicato"];
  }

}
