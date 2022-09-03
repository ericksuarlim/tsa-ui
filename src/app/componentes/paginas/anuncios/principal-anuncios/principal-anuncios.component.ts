import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEliminarComponent } from 'src/app/componentes/modals/modal-eliminar/modal-eliminar.component';
import { Anuncio } from 'src/app/modelos/anuncios';
import { ServicioAnunciosService } from 'src/app/servicios/servicio-anuncios.service';

@Component({
  selector: 'app-principal-anuncios',
  templateUrl: './principal-anuncios.component.html',
  styleUrls: ['./principal-anuncios.component.css']
})
export class PrincipalAnunciosComponent implements OnInit {

  anuncios: Anuncio[];
  constructor(
    private servicioAnuncios: ServicioAnunciosService,
    public modalService: NgbModal,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.servicioAnuncios.ObtenerAnuncios().subscribe(anuncios=>{this.anuncios=anuncios})
  }

  RedirigirCrearAnuncio(){
    this.router.navigateByUrl(`/anuncios/formulario`);
  }

  ModalEliminarAnuncio(anuncio:Anuncio){
    const modalRef = this.modalService.open(ModalEliminarComponent);

    modalRef.componentInstance.tipo = `Titulo: ${anuncio.titulo}`;
    modalRef.componentInstance.mensaje = `¿Estás seguro que quieres eliminar el anuncio?`;
    modalRef.componentInstance.delete.subscribe((confirm: boolean) => {
      if (confirm) {
        this.EliminarAnuncio(anuncio.id_anuncio);
      }
    });
  }

  EliminarAnuncio(id_anuncio:number){
    this.servicioAnuncios.EliminarAnuncio(id_anuncio).subscribe(anuncio =>{window.location.reload()});
  }

  VerAnuncio(id_anuncio:number){
    this.router.navigateByUrl(`/anuncios/${id_anuncio}`);

  }

}
