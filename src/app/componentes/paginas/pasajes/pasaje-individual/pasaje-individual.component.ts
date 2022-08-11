import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pasaje } from 'src/app/modelos/pasaje';
import { ServicioPasajesService } from 'src/app/servicios/servicio-pasajes.service';

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

}
