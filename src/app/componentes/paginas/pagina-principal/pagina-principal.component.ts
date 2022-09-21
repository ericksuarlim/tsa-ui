import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/modelos/anuncios';
import { ServicioAnunciosService } from 'src/app/servicios/servicio-anuncios.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  anuncios:Anuncio[];
  constructor(
    private servicioAnuncio:ServicioAnunciosService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.servicioAnuncio.ObtenerAnuncios().subscribe(anuncios=>{this.anuncios=anuncios})
  }

  AbrirAnuncio(id_anuncio:number){
    this.router.navigateByUrl(`/anuncios/${id_anuncio}`);
  }

  AbrirServicioSindicatos(id_sindicato:number){
    this.router.navigate(["/servicio-sindicato"], { queryParams: { id_sindicato } });
  }

}
