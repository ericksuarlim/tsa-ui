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
import { PrincipalEncomiendasComponent } from './componentes/paginas/encomiendas/principal-encomiendas/principal-encomiendas.component';
import { FormularioEncomiendasComponent } from './componentes/paginas/encomiendas/formulario-encomiendas/formulario-encomiendas.component';
import { DetalleEncomiendaComponent } from './componentes/paginas/encomiendas/detalle-encomienda/detalle-encomienda.component';
import { ReciboEncomiendaComponent } from './componentes/paginas/encomiendas/recibo-encomienda/recibo-encomienda.component';
import { DetalleViajeComponent } from './componentes/paginas/viajes/detalle-viaje/detalle-viaje.component';
import { PrincipalAnunciosComponent } from './componentes/paginas/anuncios/principal-anuncios/principal-anuncios.component';
import { FormularioAnunciosComponent } from './componentes/paginas/anuncios/formulario-anuncios/formulario-anuncios.component';
import { DetalleAnuncioComponent } from './componentes/paginas/anuncios/detalle-anuncio/detalle-anuncio.component';

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
  {path:'encomiendas', component: PrincipalEncomiendasComponent},
  {path:'encomiendas/formulario', component: FormularioEncomiendasComponent},
  {path:'encomiendas/seguimiento/:id_encomienda', component: DetalleEncomiendaComponent},
  {path:'encomiendas/recibo/:id_encomienda', component: ReciboEncomiendaComponent},
  {path:'viajes/:id_viaje', component: DetalleViajeComponent},  
  {path:'anuncios', component: PrincipalAnunciosComponent},
  {path:'anuncios/formulario', component: FormularioAnunciosComponent},  
  {path:'anuncios/:id_anuncio', component: DetalleAnuncioComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
