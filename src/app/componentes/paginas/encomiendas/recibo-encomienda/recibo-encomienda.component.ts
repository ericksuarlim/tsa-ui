import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Encomienda } from 'src/app/modelos/encomienda';
import { ServicioEncomiendasService } from 'src/app/servicios/servicio-encomiendas.service';
import {Location} from '@angular/common';
import * as html2pdf from 'html2pdf.js'


@Component({
  selector: 'app-recibo-encomienda',
  templateUrl: './recibo-encomienda.component.html',
  styleUrls: ['./recibo-encomienda.component.css']
})
export class ReciboEncomiendaComponent implements OnInit {

  encomienda: Encomienda = new Encomienda()
  constructor(
    private servicioEncomiendas:ServicioEncomiendasService,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    const id_encomienda = this.route.snapshot.params["id_encomienda"];
    this.servicioEncomiendas.ObtenerEncomienda(id_encomienda).subscribe(encomienda=>{this.encomienda=encomienda});
  }

  Atras(){
    this._location.back();
  }

  Imprimir(){
    const content: Element = document.getElementById('recibo-encomienda');
    html2pdf().from(content).toPdf().get('pdf').then(function (pdfObj) {
      pdfObj.autoPrint();
      window.open(pdfObj.output('bloburl'), '_blank');
    });
  }

  ExportarPDF(){
    const opciones ={
      filename: `Encomienda+${this.encomienda.id_encomienda}+file.pdf`,
      image: {type: 'jpeg'},
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    const content: Element = document.getElementById('recibo-encomienda');
    html2pdf().from(content).set(opciones).save();
  }

}
