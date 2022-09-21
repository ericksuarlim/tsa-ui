import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioAutenticacionService } from 'src/app/servicios/servicio-autenticacion.service';

@Component({
  selector: 'app-formulario-restablecer-password',
  templateUrl: './formulario-restablecer-password.component.html',
  styleUrls: ['./formulario-restablecer-password.component.css']
})
export class FormularioRestablecerPasswordComponent implements OnInit {
  password:string;
  confirmacion_password:string;
  verPassword:boolean= false;
  id_usuario: number;
  codigo:number;
  verConfirmacionPassword:boolean= false;
  validacion= {
    password: true,
    confirmacion_password: true,
    error: true
  }
  mensajeErrorValidacion= {
    password: "",
    confirmacion_password: "",
    error:""
  }
  constructor(
    private autenticacionService: ServicioAutenticacionService,
    private router:Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id_usuario = this.route.snapshot.queryParams["id_usuario"];
    this.codigo = this.route.snapshot.queryParams["codigo"];
  }

  RestablecerPassword(){
    if(this.ValidarEntrada('registrar'))
    {
      const datos= {
        id_usuario: this.id_usuario,
        nueva_password: this.password,
        codigo: this.codigo
      }
      this.autenticacionService.RestablecerPassword(datos).subscribe((resultado)=>{
        if(resultado.isOperational===true){
          this.router.navigateByUrl(`/`);
        }
        else
        {
          this.validacion.error = false;
          this.mensajeErrorValidacion.error = resultado.description
        }
      })
    }    
  }

  ValidarEntrada(action:string){
    if(this.password === "" || (action=="registrar" && this.password == undefined)){this.mensajeErrorValidacion.password="Contraseña necesaria"; this.validacion.password = false}else if(this.password.length<7){this.mensajeErrorValidacion.password="Debe incluir minimo 7 caracteres"; this.validacion.password = false}else if(this.password.match(/\d+/g) === null){this.mensajeErrorValidacion.password="Debe incluir al menos un numero"; this.validacion.password = false}else if(this.password === this.password.toLowerCase()){this.mensajeErrorValidacion.password="Debe incluir al menos 1 mayuscula"; this.validacion.password = false}else{this.validacion.password =true};
    if(this.confirmacion_password === "" || (action=="registrar" && this.confirmacion_password  == undefined)){this.mensajeErrorValidacion.confirmacion_password="Debe ingresar la confirmacion"; this.validacion.confirmacion_password = false}else if(this.password!= this.confirmacion_password){this.mensajeErrorValidacion.confirmacion_password="La contraseña no coincide"; this.validacion.confirmacion_password = false}else{this.validacion.confirmacion_password =true};

    const response = this.validacion.password && this.validacion.confirmacion_password ;
    return response;
  }

  Cerrar(){
    this.router.navigateByUrl(`/`);
  }

}
