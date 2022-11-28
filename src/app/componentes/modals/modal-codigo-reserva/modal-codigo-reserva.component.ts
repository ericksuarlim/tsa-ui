import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reserva } from 'src/app/modelos/reserva';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-modal-codigo-reserva',
  templateUrl: './modal-codigo-reserva.component.html',
  styleUrls: ['./modal-codigo-reserva.component.css']
})
export class ModalCodigoReservaComponent implements OnInit {

  reserva: Reserva = new Reserva();

  constructor(
    private activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
  }

  Guardar(){
    const opciones ={
      filename: `Reserva+${this.reserva.id_reserva}+file.pdf`,
      image: {type: 'jpeg'},
      html2canvas:  { scale: 1},
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    const content: Element = document.getElementById('codigo-reserva');
    html2pdf().from(content).set(opciones).save();
  }

  Cerrar(){
    this.activeModal.close(); 
  }

}
