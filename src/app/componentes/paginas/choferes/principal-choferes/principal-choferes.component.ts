import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  conductoresFiltrados: Conductor[];
  usuario: string;
  sindicatoUsuario: number;
  sindicatoCargado: string;
  cadenaBusqueda:string;
  parametroBusqueda:string;
  nombreSindicato: string;

  constructor(
    private servicioConductores: ServicioConductoresService,
    private router:Router,
    public modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sindicatoCargado = this.route.snapshot.queryParams["id_sindicato"];
    this.usuario = localStorage.getItem('nombre_usuario');
    this.sindicatoUsuario =  Number(localStorage.getItem('id_sindicato_usuario'));
    this.nombreSindicato = this.sindicatoCargado!=undefined? JSON.parse(localStorage.getItem("sindicatos"))[Number(this.sindicatoCargado)-1].nombre:false;
    if(Number(this.sindicatoCargado)===this.sindicatoUsuario){
      this.servicioConductores.ObtenerConductoresPorSindicato(Number(this.sindicatoCargado)).subscribe(conductores =>{this.conductores= conductores;this.conductoresFiltrados=conductores});
    }
    else{
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit() {
    
  }

  Filtrar() {
    if(this.cadenaBusqueda!=undefined && this.parametroBusqueda!=undefined){
      const palabras: string[] = this.cadenaBusqueda.toString().toLowerCase().trim().split(' ');
      this.conductoresFiltrados = this.conductores.filter((conductor: Conductor) => {
          let encontrado = false;
          palabras.forEach(palabra => {
            if(this.parametroBusqueda==='Carnet')
            {
              if ( String(conductor.carnet).includes(palabra)) {
                encontrado = true;
              }
            }
            else
            {
              if ( String(conductor.nombre.toLowerCase()).includes(palabra)) {
                encontrado = true;
              }
            }
          });
          return encontrado;
        }
      );
      if(this.conductoresFiltrados.length===0){
        this.conductoresFiltrados = this.conductores;
      }
    }   
  }

  editarConductor(carnet: number){
    this.router.navigate(["/conductores/formulario"], { queryParams: {carnet} });
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

  ValidarVista(){
    return this.usuario!=null && this.sindicatoUsuario===Number(this.sindicatoCargado);
  }
}
