import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pasaje } from 'src/app/modelos/pasaje';
import { ServicioPasajesService } from 'src/app/servicios/servicio-pasajes.service';
import * as html2pdf from 'html2pdf.js'
import {Location} from '@angular/common';


@Component({
  selector: 'app-pasaje-individual',
  templateUrl: './pasaje-individual.component.html',
  styleUrls: ['./pasaje-individual.component.css']
})
export class PasajeIndividualComponent implements OnInit {

  pasaje: Pasaje= new Pasaje();
  sindicatoCargado: number;
  sindicatoUsuario: number;

  constructor(
    private servicioPasaje:ServicioPasajesService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
  ){ }

  ngOnInit(): void {
    const id_pasaje = this.route.snapshot.params["id_pasaje"];
    this.sindicatoCargado = Number(this.route.snapshot.queryParams["id_sindicato"]);
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'));
    this.servicioPasaje.ObtenerPasaje(id_pasaje).subscribe(pasaje=>{
      this.pasaje=pasaje;
      if(this.sindicatoCargado!=this.sindicatoUsuario || this.pasaje.viaje.conductore.id_sindicato != this.sindicatoUsuario){
        this.router.navigate(['/']);
      }
    });
  }

  Cancelar(){
    this._location.back();
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
      pdfObj.autoPrint();
      window.open(pdfObj.output('bloburl'), '_blank');
    });
  }

  Editar(id_pasaje:number,id_viaje:number){
    this.router.navigate(["/pasajes/formulario"], { queryParams: { id_pasaje, id_viaje } });
  }

}
