import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEnvioCodigoComponent } from 'src/app/componentes/modals/modal-envio-codigo/modal-envio-codigo.component';
import { ServicioAutenticacionService } from 'src/app/servicios/servicio-autenticacion.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  nombre_usuario:string;
  password:string;
  verPassword: boolean = false;
  validacion= {
    nombre_usuario: true,
    password: true,
  }
  mensajeErrorValidacion= {
    nombre_usuario: "",
    password: "",
  }

  constructor(
    public modalService: NgbModal,
    private autenticacionService: ServicioAutenticacionService,
    private _location: Location,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  ValidarEntrada(action:string){
    if(this.nombre_usuario === "" || (action=="registrar" && this.nombre_usuario == undefined)){this.mensajeErrorValidacion.nombre_usuario="Nombre usuario necesario"; this.validacion.nombre_usuario = false}else{this.validacion.nombre_usuario =true};
    if(this.password === "" || (action=="registrar" && this.password == undefined)){this.mensajeErrorValidacion.password="Contraseña necesaria"; this.validacion.password = false}else{this.validacion.password =true};

    const response = this.validacion.nombre_usuario && this.validacion.password;
    return response;
  }

  Entrar(){
    if(this.ValidarEntrada('registrar')){
      const encryptedPassword = btoa(this.toBinary(this.password));
      const datosUsuario ={
        nombre_usuario: this.nombre_usuario,
        password: encryptedPassword
      }
      this.autenticacionService.Entrar(datosUsuario).subscribe((resultado) => {
        if(resultado.isOperational===true){
          localStorage.setItem('nombre_usuario',resultado.usuario_registrado.nombre_usuario);
          localStorage.setItem('rol_usuario',resultado.usuario_registrado.rol);
          localStorage.setItem('token_usuario',resultado.sesion.token_usuario);
          localStorage.setItem('id_sindicato_usuario',resultado.usuario_registrado.id_sindicato);
          this.router.navigateByUrl(`/`).then(() => {
            window.location.reload();
          });
        }
        else
        {
          if(resultado.description === 'Usuario incorrecto'){ this.validacion.nombre_usuario = false;this.mensajeErrorValidacion.nombre_usuario = resultado.description;}else{this.validacion.password = false;this.mensajeErrorValidacion.password = resultado.description;}
        }
      })
    }
  }

  VerPassword(){
    this.verPassword = !this.verPassword;
  }

  AbrirEnvioCodigo(){
    const modalRef = this.modalService.open(ModalEnvioCodigoComponent);
  }

  toBinary(string:any) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
  }
  
  fromBinary(binary:any) {
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint16Array(bytes.buffer));
  }


}
