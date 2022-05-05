import { NgModule } from '@angular/core';
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
    FormularioTurnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
