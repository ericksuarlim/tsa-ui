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
    const encryptedPassword = btoa(this.toBinary(this.password));
    console.log(encryptedPassword);
    const desencryptedPassword = this.fromBinary(atob(encryptedPassword));
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
