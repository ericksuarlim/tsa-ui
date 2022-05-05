import { Component, OnInit } from '@angular/core';
import { Conductor } from 'src/app/modelos/conductor';
import { ServicioConductoresService } from 'src/app/servicios/servicio-conductores.service';
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-formulario-choferes',
  templateUrl: './formulario-choferes.component.html',
  styleUrls: ['./formulario-choferes.component.css']
})
export class FormularioChoferesComponent implements OnInit {
  conductor: Conductor = new Conductor();
  conductores: Conductor[];
  conductorNuevo: boolean;
  activo: string;
  validacion= {
    carnet : true,
    nombre: true,
    apellido_paterno: true,
    apellido_materno: true,
    fecha_nacimiento: true,
    ciudad: true,
    activo: true,
    id_auto_1: true,
    id_auto_2: true,
    grupo: true,
    id_sindicato: true
  }
  mensajeErrorValidacion= {
    carnet : "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_nacimiento: "",
    ciudad: "",
    activo: "",
    id_auto_1: "",
    id_auto_2: "",
    grupo: "",
    id_sindicato: "",
  }

  constructor(private servicioConductores: ServicioConductoresService,private router: Router,private route: ActivatedRoute) {
    
   }

  ngOnInit(): void {
   
    const carnet = this.route.snapshot.queryParams["carnet"];
    this.conductorNuevo = carnet == undefined;
    if(!this.conductorNuevo){
      this.servicioConductores.ObtenerConductor(carnet).subscribe(conductor=>{
        this.conductor=conductor;
        this.activo = (this.conductor.activo==true)? "Activo" : "Desocupado";
      });
    }  
    this.servicioConductores.ObtenerConductores().subscribe(conductores =>{
      this.conductores = conductores;
    })

  }

  CrearConductor(){
    if(this.ValidarCampos("registrar"))
    {
      var conductorEnviar = new Conductor();
      conductorEnviar.carnet = this.conductor.carnet;
      conductorEnviar.nombre = this.conductor.nombre;
      conductorEnviar.apellido_paterno = this.conductor.apellido_paterno;
      conductorEnviar.apellido_materno = this.conductor.apellido_materno;
      conductorEnviar.fecha_nacimiento = this.conductor.fecha_nacimiento;
      conductorEnviar.ciudad = this.conductor.ciudad;
      conductorEnviar.activo = (this.activo == "Activo") ? true : false;
      conductorEnviar.id_auto_1 = this.conductor.id_auto_1;
      conductorEnviar.id_auto_2 = this.conductor.id_auto_2;
      conductorEnviar.grupo = this.conductor.grupo;
      conductorEnviar.id_sindicato = this.conductor.id_sindicato;
      this.servicioConductores.CrearConductor(conductorEnviar).subscribe(result=>{
        this.router.navigateByUrl("/conductores");
      }); 
    } 
  }

  EditarConductor(){
    this.servicioConductores.EditarConductor(this.conductor).subscribe(result=>{
      this.router.navigateByUrl("/conductores");
    });
  }

  ValidarCampos(action:String):boolean{ 
    if(this.conductor.carnet === null || (action=="registrar" && this.conductor.carnet == undefined)){this.mensajeErrorValidacion.carnet="Carnet necesario"; this.validacion.carnet = false}else if(this.conductores.find((c)=>{return c.carnet ==this.conductor.carnet}) && this.conductorNuevo){this.mensajeErrorValidacion.carnet="Carnet ya existente"; this.validacion.carnet = false}else{this.validacion.carnet =true};
    if(this.conductor.nombre === "" || (action=="registrar" && this.conductor.nombre == undefined)){this.mensajeErrorValidacion.nombre="Nombre necesario"; this.validacion.nombre = false}else{this.validacion.nombre =true};
    if(this.conductor.apellido_paterno === "" || (action=="registrar" && this.conductor.apellido_paterno == undefined)){this.mensajeErrorValidacion.apellido_paterno="Apellido necesario"; this.validacion.apellido_paterno = false}else{this.validacion.apellido_paterno =true};
    if(this.conductor.fecha_nacimiento === "" || (action=="registrar" && this.conductor.fecha_nacimiento == undefined)){this.mensajeErrorValidacion.fecha_nacimiento="Fecha necesaria"; this.validacion.fecha_nacimiento = false}else if(this.conductor.fecha_nacimiento >= moment().format('YYYY-MM-DD')){this.mensajeErrorValidacion.fecha_nacimiento="Fecha invalida"; this.validacion.fecha_nacimiento = false}else{this.validacion.fecha_nacimiento =true};
    if(this.conductor.ciudad === "" || (action=="registrar" && this.conductor.ciudad == undefined)){this.mensajeErrorValidacion.ciudad="Ciudad necesaria"; this.validacion.ciudad = false}else{this.validacion.ciudad =true};
    if(this.activo === null || (action=="registrar" && this.activo == undefined)){this.mensajeErrorValidacion.activo="Estado necesario"; this.validacion.activo = false}else{this.validacion.activo =true};
    if(this.conductor.grupo === "" || (action=="registrar" && this.conductor.grupo == undefined)){this.mensajeErrorValidacion.grupo="Grupo necesario"; this.validacion.grupo = false}else{this.validacion.grupo =true};
    if(this.conductor.id_sindicato === "" || (action=="registrar" && this.conductor.id_sindicato == undefined)){this.mensajeErrorValidacion.id_sindicato="Sindicato necesario"; this.validacion.id_sindicato = false}else{this.validacion.id_sindicato =true};

    const response = this.validacion.carnet && this.validacion.nombre && this.validacion.apellido_paterno &&
    this.validacion.fecha_nacimiento && this.validacion.ciudad && this.validacion.activo && this.validacion.grupo && this.validacion.id_sindicato;
    return response;
  }

  Cancelar(){
    this.router.navigateByUrl("/conductores");
  }
}
