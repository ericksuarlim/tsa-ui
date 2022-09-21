import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-opciones-creacion',
  templateUrl: './modal-opciones-creacion.component.html',
  styleUrls: ['./modal-opciones-creacion.component.css']
})
export class ModalOpcionesCreacionComponent implements OnInit {


  id_sindicato: string;

  constructor(   private activeModal: NgbActiveModal,
    private router:Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id_sindicato = this.route.snapshot.queryParams["id_sindicato"];

  }

  AbrirViajes(){
    this.activeModal.close(); 
    this.router.navigate([`/viajes`], { queryParams: { id_sindicato:this.id_sindicato }})
  }

  Cancelar(){
    this.activeModal.close(); 
  }

}
