import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Viaje } from 'src/app/modelos/viaje';

@Component({
  selector: 'app-modal-opciones-viajes',
  templateUrl: './modal-opciones-viajes.component.html',
  styleUrls: ['./modal-opciones-viajes.component.css']
})
export class ModalOpcionesViajesComponent implements OnInit {

  viaje: Viaje = new Viaje();

  constructor(
    private activeModal: NgbActiveModal,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }
  
  Cancelar(){
    this.activeModal.close(); 
  }

  EditarViaje(id_viaje:number){
    this.activeModal.close(); 
    this.router.navigate(["/viajes/formulario"], { queryParams: { id_viaje } });
  }

  RegistrarPasaje(id_viaje:number){
    this.activeModal.close(); 
    this.router.navigate(["/pasajes/formulario"], { queryParams: { id_viaje } });
  }

  CambiarUbicacion(id_viaje:number){

  }


}
