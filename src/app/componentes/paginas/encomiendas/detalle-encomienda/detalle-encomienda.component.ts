import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Encomienda } from 'src/app/modelos/encomienda';
import { ServicioEncomiendasService } from 'src/app/servicios/servicio-encomiendas.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-detalle-encomienda',
  templateUrl: './detalle-encomienda.component.html',
  styleUrls: ['./detalle-encomienda.component.css']
})
export class DetalleEncomiendaComponent implements OnInit {

  encomienda:Encomienda= new Encomienda();

  constructor(
    private servicioEncomiendas:ServicioEncomiendasService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id_encomienda = this.route.snapshot.params["id_encomienda"];
    this.servicioEncomiendas.ObtenerEncomienda(id_encomienda).subscribe(encomienda=>{this.encomienda=encomienda});
  }

  Atras(){
    this._location.back();
  }

  Editar(id_encomienda:number,id_viaje:number){
    this.router.navigate(["/encomiendas/formulario"], { queryParams: { id_encomienda, id_viaje } });
  }

  VerRecibo(id_encomienda:number){
    this.router.navigateByUrl(`/encomiendas/recibo/${id_encomienda}`);
  }

}
