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
  usuariosFiltrados: Usuario[];
  sindicatoUsuario: number;
  cadenaBusqueda:string;
  parametroBusqueda:string;
  constructor(
    private _location: Location,
    private usuariosService:ServicioUsuariosService,
    private router:Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.usuariosService.ObtenerUsuariosFiltrados(this.sindicatoUsuario).subscribe((usuarios)=>{this.usuarios=usuarios;this.usuariosFiltrados=usuarios});
  }

  Filtrar() {
    if(this.cadenaBusqueda!=undefined && this.parametroBusqueda!=undefined){
      const palabras: string[] = this.cadenaBusqueda.toString().toLowerCase().trim().split(' ');
      this.usuariosFiltrados = this.usuarios.filter((usuario: Usuario) => {
          let encontrado = false;
          palabras.forEach(palabra => {
            if(this.parametroBusqueda==='Carnet')
            {
              if ( String(usuario.carnet).includes(palabra)) {
                encontrado = true;
              }
            }
            else
            {
              if ( String(usuario.nombres.toLowerCase()).includes(palabra)) {
                encontrado = true;
              }
            }
          });
          return encontrado;
        }
      );
      if(this.usuariosFiltrados.length===0){
        this.usuariosFiltrados = this.usuarios;
      }
    }   
  }

  CrearUsuario(){
    this.router.navigateByUrl(`/usuarios/formulario`);
  }

  AbrirUsuario(id_usuario:number){
    this.router.navigateByUrl(`/usuarios/${id_usuario}`);

  }

}
