import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/modelos/anuncios';
import { Sindicato } from 'src/app/modelos/sindicato';
import { ServicioAnunciosService } from 'src/app/servicios/servicio-anuncios.service';
import { ServicioSindicatosService } from 'src/app/servicios/servicio-sindicatos.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  anuncios:Anuncio[];
  sindicatos: Sindicato[];
  constructor(
    private servicioAnuncio:ServicioAnunciosService,
    private sindicatosServices:ServicioSindicatosService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    console.log('Entro');
    this.sindicatosServices.ObtenerSindicatos().subscribe(sindicatos=>{this.sindicatos = sindicatos})

    this.servicioAnuncio.ObtenerAnuncios().subscribe(anuncios=>{this.anuncios=anuncios});
  }

  AbrirAnuncio(id_anuncio:number){
    this.router.navigateByUrl(`/anuncios/${id_anuncio}`);
  }

  AbrirServicioSindicatos(id_sindicato:number){
    this.router.navigate(["/servicio-sindicato"], { queryParams: { id_sindicato } });
  }

}
