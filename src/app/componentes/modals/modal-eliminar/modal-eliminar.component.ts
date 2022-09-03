import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {

  
  @Output() delete: EventEmitter<boolean>  = new EventEmitter();

  tipo: string = '';
  mensaje:string = '';

  constructor(
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
  }

  async confirmar(){
    this.delete.emit(true);
    this.activeModal.close();
  }

  async cancelar(){
    this.delete.emit(false);
    this.activeModal.close(); 
  }


}
