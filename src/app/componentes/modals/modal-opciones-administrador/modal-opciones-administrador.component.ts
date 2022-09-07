import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-opciones-administrador',
  templateUrl: './modal-opciones-administrador.component.html',
  styleUrls: ['./modal-opciones-administrador.component.css']
})
export class ModalOpcionesAdministradorComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  Cancelar(){
    this.activeModal.close(); 
  }

  CrearUsuario(){
    this.activeModal.close(); 
    this.router.navigateByUrl("/usuarios/formulario");
  }

  HabilitarUsuario(){
    this.activeModal.close(); 
    this.router.navigateByUrl("/usuarios/gestion");
  }

  VerUsuarios(){
    this.activeModal.close(); 
    this.router.navigateByUrl("/usuarios");
  }

}
