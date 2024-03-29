import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Viaje } from 'src/app/modelos/viaje';
import { ServicioViajesService } from 'src/app/servicios/servicio-viajes.service';

@Component({
  selector: 'app-modal-opciones-viajes',
  templateUrl: './modal-opciones-viajes.component.html',
  styleUrls: ['./modal-opciones-viajes.component.css']
})
export class ModalOpcionesViajesComponent implements OnInit {

  viaje: Viaje = new Viaje();
  cambiarUbicacion: boolean = false;
  id_sindicato: string;

  constructor(
    private activeModal: NgbActiveModal,
    private router:Router,
    private viajesService: ServicioViajesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id_sindicato = this.route.snapshot.queryParams["id_sindicato"];
  }
  
  Cancelar(){
    this.activeModal.close(); 
  }

  EditarViaje(id_viaje:number){
    this.activeModal.close(); 
    this.router.navigate(["/viajes/formulario"], { queryParams: { id_viaje } });
  }

  RegistrarPasaje(id_viaje:number){
    this.activeModal.close(); 
    this.router.navigate(["/pasajes/formulario"], { queryParams: { id_viaje } });
  }

  RegistrarEncomienda(id_viaje:number){
    this.activeModal.close(); 
    this.router.navigate(["/encomiendas/formulario"], { queryParams: { id_viaje } });
  }

  CambiarUbicacionViaje(){
    this.viajesService.EditarViaje(this.viaje).subscribe(result=>{
      this.activeModal.close(); 
      window.location.reload(); 
    });
  }

  VerViaje(id_viaje:number){
    this.activeModal.close(); 
    this.router.navigate([`/viajes/${id_viaje}`], { queryParams: { id_sindicato:this.id_sindicato }});
  }


}
