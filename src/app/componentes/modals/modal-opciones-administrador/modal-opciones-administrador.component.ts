import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-opciones-administrador',
  templateUrl: './modal-opciones-administrador.component.html',
  styleUrls: ['./modal-opciones-administrador.component.css']
})
export class ModalOpcionesAdministradorComponent implements OnInit {

  sindicatoUsuario: number;
  rolUsuario: string;
  constructor(
    private activeModal: NgbActiveModal,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.rolUsuario = localStorage.getItem('rol_usuario');
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
    //this.router.navigate(['/usuarios/gestion'],{queryParams: {sindicato: this.sindicatoUsuario }})
    this.router.navigateByUrl("/usuarios/gestion");
  }

  VerUsuarios(){
    this.activeModal.close(); 
    this.router.navigate([`/usuarios`])
  }

  VerSindicatos(){
    this.activeModal.close(); 
    this.router.navigate([`/sindicatos`])
  }

}
