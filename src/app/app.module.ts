import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionComponent } from './componentes/barra-navegacion/barra-navegacion.component';
import { PaginaPrincipalComponent } from './componentes/paginas/pagina-principal/pagina-principal.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { ServiciosSindicatosComponent } from './componentes/paginas/servicios-sindicatos/servicios-sindicatos.component';
import { PrincipalChoferesComponent } from './componentes/paginas/choferes/principal-choferes/principal-choferes.component';
import { FormularioChoferesComponent } from './componentes/paginas/choferes/formulario-choferes/formulario-choferes.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalEliminarComponent } from './componentes/modals/modal-eliminar/modal-eliminar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrincipalTurnosComponent } from './componentes/paginas/turnos/principal-turnos/principal-turnos.component';
import { FormularioTurnosComponent } from './componentes/paginas/turnos/formulario-turnos/formulario-turnos.component';
import { DetallesTurnoComponent } from './componentes/paginas/turnos/detalles-turno/detalles-turno.component';
import { PrincipalReservasComponent } from './componentes/paginas/reservas/principal-reservas/principal-reservas.component';
import { FormularioReservasComponent } from './componentes/paginas/reservas/formulario-reservas/formulario-reservas.component';
import { ModalOpcionesReservasComponent } from './componentes/modals/modal-opciones-reservas/modal-opciones-reservas.component';
import { PasajesPrincipalComponent } from './componentes/paginas/pasajes/pasajes-principal/pasajes-principal.component';
import { FormularioPasajesComponent } from './componentes/paginas/pasajes/formulario-pasajes/formulario-pasajes.component';
import { PasajeIndividualComponent } from './componentes/paginas/pasajes/pasaje-individual/pasaje-individual.component';
import { PrincipalViajesComponent } from './componentes/paginas/viajes/principal-viajes/principal-viajes.component';
import { FormularioViajesComponent } from './componentes/paginas/viajes/formulario-viajes/formulario-viajes.component';
import { ModalOpcionesViajesComponent } from './componentes/modals/modal-opciones-viajes/modal-opciones-viajes.component';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { PrincipalEncomiendasComponent } from './componentes/paginas/encomiendas/principal-encomiendas/principal-encomiendas.component';
import { FormularioEncomiendasComponent } from './componentes/paginas/encomiendas/formulario-encomiendas/formulario-encomiendas.component';
import { DetalleEncomiendaComponent } from './componentes/paginas/encomiendas/detalle-encomienda/detalle-encomienda.component';
import { ReciboEncomiendaComponent } from './componentes/paginas/encomiendas/recibo-encomienda/recibo-encomienda.component';
import { DetalleViajeComponent } from './componentes/paginas/viajes/detalle-viaje/detalle-viaje.component';
import { ModalOpcionesCreacionComponent } from './componentes/modals/modal-opciones-creacion/modal-opciones-creacion.component';
registerLocaleData(localeEsAr, 'es-Ar');


@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionComponent,
    PaginaPrincipalComponent,
    PiePaginaComponent,
    ServiciosSindicatosComponent,
    PrincipalChoferesComponent,
    FormularioChoferesComponent,
    ModalEliminarComponent,
    PrincipalTurnosComponent,
    FormularioTurnosComponent,
    DetallesTurnoComponent,
    PrincipalReservasComponent,
    FormularioReservasComponent,
    ModalOpcionesReservasComponent,
    PasajesPrincipalComponent,
    FormularioPasajesComponent,
    PasajeIndividualComponent,
    PrincipalViajesComponent,
    FormularioViajesComponent,
    ModalOpcionesViajesComponent,
    PrincipalEncomiendasComponent,
    FormularioEncomiendasComponent,
    DetalleEncomiendaComponent,
    ReciboEncomiendaComponent,
    DetalleViajeComponent,
    ModalOpcionesCreacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
