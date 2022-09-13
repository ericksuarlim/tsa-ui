import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicioAutenticacionService } from 'src/app/servicios/servicio-autenticacion.service';

@Component({
  selector: 'app-modal-envio-codigo',
  templateUrl: './modal-envio-codigo.component.html',
  styleUrls: ['./modal-envio-codigo.component.css']
})
export class ModalEnvioCodigoComponent implements OnInit {
  nombre_usuario:string;
  validacion= {
    nombre_usuario: true,
  }
  mensajeErrorValidacion= {
    nombre_usuario: "",
  }
  constructor(
    private activeModal: NgbActiveModal,
    private router:Router,
    private autenticacionService: ServicioAutenticacionService,
  ) { }

  ngOnInit(): void {
  }


  ValidarEntrada(action:string){
    if(this.nombre_usuario === "" || (action=="registrar" && this.nombre_usuario == undefined)){this.mensajeErrorValidacion.nombre_usuario="Nombre usuario necesario"; this.validacion.nombre_usuario = false}else{this.validacion.nombre_usuario =true};

    const response = this.validacion.nombre_usuario;
    return response;
  }

  
  EnviarCodigo(){
    if(this.ValidarEntrada('registrar')){
      const datos= {
       nombre_usuario: this.nombre_usuario
      }
      this.autenticacionService.SolicitudRestablecerPassword(datos).subscribe((resultado)=>{
        if(resultado.isOperational===true){
          this.activeModal.close(); 
        }
        else
        {
          this.validacion.nombre_usuario = false;
          this.mensajeErrorValidacion.nombre_usuario = resultado.description
        }
      })

    }
  }

}
