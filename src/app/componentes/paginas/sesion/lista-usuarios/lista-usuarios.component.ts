import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import {Location} from '@angular/common';
import { ServicioUsuariosService } from 'src/app/servicios/servicio-usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[];
  constructor(
    private _location: Location,
    private usuariosService:ServicioUsuariosService,
    private router:Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.usuariosService.ObtenerUsuarios().subscribe((usuarios)=>{this.usuarios=usuarios});
  }

  CrearUsuario(){
    this.router.navigateByUrl(`/usuarios/formulario`);
  }

  AbrirUsuario(id_usuario:number){
    this.router.navigateByUrl(`/usuarios/${id_usuario}`);

  }

}
