import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-restablecer-password',
  templateUrl: './formulario-restablecer-password.component.html',
  styleUrls: ['./formulario-restablecer-password.component.css']
})
export class FormularioRestablecerPasswordComponent implements OnInit {
  password:string;
  confirmacion_password:string;
  validacion= {
    password: true,
    confirmacion_password: true
  }
  mensajeErrorValidacion= {
    nombre_usuario: "",
    confirmacion_password: ""
  }
  constructor() { }

  ngOnInit(): void {
  }

  RestablecerPassword(){

  }

  ValidarEntrada(tipo:string){

  }



}
