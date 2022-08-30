import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './componentes/paginas/pagina-principal/pagina-principal.component';
import  {ServiciosSindicatosComponent} from './componentes/paginas/servicios-sindicatos/servicios-sindicatos.component';
import  {PrincipalChoferesComponent} from './componentes/paginas/choferes/principal-choferes/principal-choferes.component';
import  {FormularioChoferesComponent} from './componentes/paginas/choferes/formulario-choferes/formulario-choferes.component';
import { ModalEliminarComponent } from './componentes/modals/modal-eliminar/modal-eliminar.component';
import { PrincipalTurnosComponent } from './componentes/paginas/turnos/principal-turnos/principal-turnos.component';
import { FormularioTurnosComponent } from './componentes/paginas/turnos/formulario-turnos/formulario-turnos.component';
import { DetallesTurnoComponent } from './componentes/paginas/turnos/detalles-turno/detalles-turno.component';
import { PrincipalReservasComponent } from './componentes/paginas/reservas/principal-reservas/principal-reservas.component';
import { FormularioReservasComponent } from './componentes/paginas/reservas/formulario-reservas/formulario-reservas.component';
import { PasajesPrincipalComponent } from './componentes/paginas/pasajes/pasajes-principal/pasajes-principal.component';
import { FormularioPasajesComponent } from './componentes/paginas/pasajes/formulario-pasajes/formulario-pasajes.component';
import { PasajeIndividualComponent } from './componentes/paginas/pasajes/pasaje-individual/pasaje-individual.component';
import { PrincipalViajesComponent } from './componentes/paginas/viajes/principal-viajes/principal-viajes.component';
import { FormularioViajesComponent } from './componentes/paginas/viajes/formulario-viajes/formulario-viajes.component';

const routes: Routes = [
  {path:'', component: PaginaPrincipalComponent},
  {path:'servicio-sindicato', component: ServiciosSindicatosComponent},
  {path:'conductores', component: PrincipalChoferesComponent},
  {path:'conductores/formulario', component: FormularioChoferesComponent},
  {path:'conductores/modal', component: ModalEliminarComponent},
  {path:'turnos', component: PrincipalTurnosComponent},
  {path:'pasajes', component: PasajesPrincipalComponent},
  {path:'turnos/formulario', component: FormularioTurnosComponent},
  {path:'pasajes/formulario', component: FormularioPasajesComponent},
  {path:'turnos/:id_turno/detalles-turno', component: DetallesTurnoComponent},
  {path:'reservas', component: PrincipalReservasComponent},
  {path:'reservas/formulario', component: FormularioReservasComponent},
  {path:'pasajes/recibo/:id_pasaje', component: PasajeIndividualComponent },
  {path:'viajes', component: PrincipalViajesComponent },
  {path:'viajes/formulario', component: FormularioViajesComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
