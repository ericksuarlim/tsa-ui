import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import {Location} from '@angular/common';
import { ServicioUsuariosService } from 'src/app/servicios/servicio-usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-formulario-crear-usuario',
  templateUrl: './formulario-crear-usuario.component.html',
  styleUrls: ['./formulario-crear-usuario.component.css']
})
export class FormularioCrearUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioNuevo:boolean= true;
  sindicatoUsuario: number;
  datosRevisados: boolean= false;

  abecedario = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];

  numeroCorrelativo: number;
  validacion= {
    carnet:true,
    nombres: true,
    apellido_paterno: true,
    celular_referencia: true,
    id_sindicato: true,
    rol: true
  }
  mensajeErrorValidacion= {
    carnet: "",
    nombres: "",
    apellido_paterno: "",
    celular_referencia: "",
    id_sindicato: "",
    rol: "",
  }

  constructor(
    private _location: Location,
    private usuariosService:ServicioUsuariosService,
    private router:Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id_usuario = this.route.snapshot.queryParams["id_usuario"];
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'))
    this.usuarioNuevo = id_usuario == undefined;
    if(!this.usuarioNuevo){
      this.usuariosService.ObtenerUsuario(id_usuario).subscribe(usuario=>{
        if(usuario.id_sindicato===this.sindicatoUsuario){
          this.usuario=usuario;
          this.datosRevisados = true;
        }
        else{
          this.router.navigate(['/']);
        }
      })
    }
    this.usuariosService.ObtenerCantidadUsuarios().subscribe(resultado=>{this.numeroCorrelativo = resultado+1})
  }

  ValidarCampos(action: string){
    if(this.usuario.carnet === null || (action=="registrar" && this.usuario.carnet == undefined)){this.mensajeErrorValidacion.carnet="Carnet necesario"; this.validacion.carnet = false}else{this.validacion.carnet =true};
    if(this.usuario.nombres === "" || (action=="registrar" && this.usuario.nombres == undefined)){this.mensajeErrorValidacion.nombres="Nombre necesario"; this.validacion.nombres = false}else{this.validacion.nombres =true};
    if(this.usuario.apellido_paterno === "" || (action=="registrar" && this.usuario.apellido_paterno == undefined)){this.mensajeErrorValidacion.apellido_paterno="Apellido paterno necesario"; this.validacion.apellido_paterno = false}else{this.validacion.apellido_paterno =true};
    if(this.usuario.celular_referencia === null || (action=="registrar" && this.usuario.celular_referencia == undefined)){this.mensajeErrorValidacion.celular_referencia="Celular necesario"; this.validacion.celular_referencia = false}else{this.validacion.celular_referencia =true};
    if(this.usuario.rol === "" || (action=="registrar" && this.usuario.rol == undefined)){this.mensajeErrorValidacion.rol="Rol necesario"; this.validacion.rol = false}else{this.validacion.rol =true};

    const response = this.validacion.carnet && this.validacion.celular_referencia && this.validacion.apellido_paterno && this.validacion.nombres && this.validacion.rol ;
    return response;
  }

  Cancelar(){
    this._location.back();
  }

  ActualizarUsuario(){
    if(this.ValidarCampos('registrar'))
    {
      this.usuariosService.EditarUsuario(this.usuario).subscribe(()=>{
        this.router.navigateByUrl(`/usuarios`);
      })
    }
  }

  CrearUsuario(){
    if(this.ValidarCampos('registrar'))
    {
      this.usuario.id_sindicato = this.sindicatoUsuario;
      this.usuario.habilitado = true;

      if(this.usuario.rol === 'administrador')
      {
        this.usuario.nombre_usuario = `administrador_${this.numeroCorrelativo}`;
        this.usuario.password = `administrador_${this.GeneradorCaracteres()}`;
      }
      else
      {
        this.usuario.nombre_usuario = `secretaria_${this.numeroCorrelativo}`;
        this.usuario.password = `secretaria${this.GeneradorCaracteres()}`;
      }
      this.usuariosService.CrearUsuario(this.usuario).subscribe((result)=>{
        this.router.navigateByUrl(`/usuarios/${result.id_usuario}`);
      });
    }
  }

  GeneradorCaracteres():string{
    let cadena= "";
    for(let i = 0; i < 4; i++){
      cadena = cadena + this.abecedario[Math.floor((Math.random()*36)+0)];
    }
    return cadena
  }


}
