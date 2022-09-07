import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  ) { }

  ngOnInit(): void {
  }

  ValidarEntrada(){
    
  }
  EnviarCodigo(){
    this.activeModal.close(); 
  }

}
