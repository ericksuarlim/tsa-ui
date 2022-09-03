import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-opciones-creacion',
  templateUrl: './modal-opciones-creacion.component.html',
  styleUrls: ['./modal-opciones-creacion.component.css']
})
export class ModalOpcionesCreacionComponent implements OnInit {

  constructor(   private activeModal: NgbActiveModal,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  AbrirViajes(){
    this.activeModal.close(); 
    this.router.navigateByUrl("/viajes");
  }

  Cancelar(){
    this.activeModal.close(); 
  }

}
