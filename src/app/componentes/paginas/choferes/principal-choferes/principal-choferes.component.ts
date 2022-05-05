import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEliminarComponent } from 'src/app/componentes/modals/modal-eliminar/modal-eliminar.component';
import { Conductor } from 'src/app/modelos/conductor';
import { ServicioConductoresService } from 'src/app/servicios/servicio-conductores.service';

@Component({
  selector: 'app-principal-choferes',
  templateUrl: './principal-choferes.component.html',
  styleUrls: ['./principal-choferes.component.css']
})
export class PrincipalChoferesComponent implements OnInit {

  conductores: Conductor[];
  constructor(
    private servicioConductores: ServicioConductoresService,
    private router:Router,
    public modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.servicioConductores.ObtenerConductores().subscribe(conductores =>{this.conductores= conductores});
  }

  ngAfterViewInit() {
    
  }

  editarConductor(carnet: number){
    this.router.navigate(["/conductores/formulario"], { queryParams: { carnet } });
  }

  AbrilModalEliminar(conductor:Conductor){
    const modalRef = this.modalService.open(ModalEliminarComponent);

    modalRef.componentInstance.tipo = `${conductor.nombre} ${conductor.apellido_paterno}`;
    modalRef.componentInstance.mensaje = `¿Estás seguro que quieres eliminar al conductor?`;
    modalRef.componentInstance.delete.subscribe((confirm: boolean) => {
      if (confirm) {
        this.EliminarConductor(conductor.carnet);
      }
    });
  }

  EliminarConductor(carnet:number){
    this.servicioConductores.EliminarConductor(carnet).subscribe(conductores =>{window.location.reload()});
  }

  

}
