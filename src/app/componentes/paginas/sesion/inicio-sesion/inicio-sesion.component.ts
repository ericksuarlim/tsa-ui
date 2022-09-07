import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEnvioCodigoComponent } from 'src/app/componentes/modals/modal-envio-codigo/modal-envio-codigo.component';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  nombre_usuario:string;
  password:string;
  validacion= {
    nombre_usuario: true,
    password: true,
  }
  mensajeErrorValidacion= {
    nombre_usuario: "",
    password: "",
  }

  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
  }

  ValidarEntrada(tipo:string){

  }

  Entrar(){

  }

  AbrirEnvioCodigo(){
    const modalRef = this.modalService.open(ModalEnvioCodigoComponent);

  }

}
