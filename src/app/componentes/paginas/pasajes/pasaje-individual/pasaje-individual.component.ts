import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pasaje } from 'src/app/modelos/pasaje';
import { ServicioPasajesService } from 'src/app/servicios/servicio-pasajes.service';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-pasaje-individual',
  templateUrl: './pasaje-individual.component.html',
  styleUrls: ['./pasaje-individual.component.css']
})
export class PasajeIndividualComponent implements OnInit {

  pasaje: Pasaje= new Pasaje();
  
  constructor(
    private servicioPasaje:ServicioPasajesService,
    private router: Router,
    private route: ActivatedRoute
  ){ }

  ngOnInit(): void {
    const id_pasaje = this.route.snapshot.params["id_pasaje"];
    this.servicioPasaje.ObtenerPasaje(id_pasaje).subscribe(pasaje=>{
      this.pasaje=pasaje;
    });
  }

  Cancelar(){
    this.router.navigateByUrl("/pasajes");
  }

  ExportarPDF(){
    const opciones ={
      filename: `Pasaje+${this.pasaje.id_pasaje}+file.pdf`,
      image: {type: 'jpeg'},
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    const content: Element = document.getElementById('recibo-pasaje');
    html2pdf().from(content).set(opciones).save();
  }

  Imprimir(){
    const content: Element = document.getElementById('recibo-pasaje');

    html2pdf().from(content).toPdf().get('pdf').then(function (pdfObj) {
      // pdfObj has your jsPDF object in it, use it as you please!
      // For instance (untested):
      pdfObj.autoPrint();
      window.open(pdfObj.output('bloburl'), '_blank');
  });
  }

}
