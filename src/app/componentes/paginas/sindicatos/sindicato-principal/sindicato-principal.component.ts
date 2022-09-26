import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sindicato } from 'src/app/modelos/sindicato';
import { ServicioSindicatosService } from 'src/app/servicios/servicio-sindicatos.service';

@Component({
  selector: 'app-sindicato-principal',
  templateUrl: './sindicato-principal.component.html',
  styleUrls: ['./sindicato-principal.component.css']
})
export class SindicatoPrincipalComponent implements OnInit {

  sindicatos: Sindicato[];
  constructor(private sindicatosServices:ServicioSindicatosService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.sindicatosServices.ObtenerSindicatos().subscribe(sindicatos=>{this.sindicatos = sindicatos})

  }

  CrearSindicato(){
    this.router.navigate(['/sindicatos/formulario']);
  }

  EditarSindicato(id_sindicato:number){
    this.router.navigate(["/sindicatos/formulario"], { queryParams: { id_sindicato } });
  }

  EliminarSindicato(id_sindicato:number){
    this.sindicatosServices.EliminarSindicato(id_sindicato).subscribe(resultado=>{
      window.location.reload();
    });
  }

  ActivarSindicato(){
    this.router.navigate(["/sindicatos/gestion"]);

  }
  

}
