import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './componentes/paginas/pagina-principal/pagina-principal.component';
import  {ServiciosSindicatosComponent} from './componentes/paginas/servicios-sindicatos/servicios-sindicatos.component';
import  {PrincipalChoferesComponent} from './componentes/paginas/choferes/principal-choferes/principal-choferes.component';
import  {FormularioChoferesComponent} from './componentes/paginas/choferes/formulario-choferes/formulario-choferes.component';
import { ModalEliminarComponent } from './componentes/modals/modal-eliminar/modal-eliminar.component';
import { PrincipalTurnosComponent } from './componentes/paginas/turnos/principal-turnos/principal-turnos.component';
import { FormularioTurnosComponent } from './componentes/paginas/turnos/formulario-turnos/formulario-turnos.component';

const routes: Routes = [
  {path:'', component: PaginaPrincipalComponent},
  {path:'servicio-sindicato', component: ServiciosSindicatosComponent},
  {path:'conductores', component: PrincipalChoferesComponent},
  {path:'conductores/formulario', component: FormularioChoferesComponent},
  {path:'conductores/modal', component: ModalEliminarComponent},
  {path:'turnos', component: PrincipalTurnosComponent},
  {path:'turnos/formulario', component: FormularioTurnosComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
