import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioUsuariosService } from 'src/app/servicios/servicio-usuarios.service';
import {Location} from '@angular/common';
import { Usuario } from 'src/app/modelos/usuario';


@Component({
  selector: 'app-formulario-habilitar-usuario',
  templateUrl: './formulario-habilitar-usuario.component.html',
  styleUrls: ['./formulario-habilitar-usuario.component.css']
})
export class FormularioHabilitarUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarios:Usuario[];
  estadoUsuario="";

  constructor(
    private _location: Location,
    private usuariosService:ServicioUsuariosService,
    private router:Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const sindicato = this.route.snapshot.queryParams["sindicato"];
    this.usuariosService.ObtenerUsuariosFiltrados(sindicato).subscribe(usuarios=>{this.usuarios=usuarios})
  }

  CambiarEstado(){
    this.usuariosService.HabilitarUsuario(this.usuario.id_usuario).subscribe(()=>{
      this._location.back();
    })
  }

  Cancelar(){
    this._location.back();
  }

}
