import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import { BnNgIdleService } from 'bn-ng-idle';
import { ServicioAutenticacionService } from './servicios/servicio-autenticacion.service';
import { Router } from '@angular/router';
import { ServicioSindicatosService } from './servicios/servicio-sindicatos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'terminal-web-app';

  constructor(
    private bnIdle: BnNgIdleService,
    private autenticacionService: ServicioAutenticacionService,
    private sindicatosService: ServicioSindicatosService,
    private router:Router,
  ) {  }

  async ngOnInit(){
    await this.initFirebase();
    if(localStorage.getItem('token_usuario')!=null){
      if(!this.isTokenExpired(localStorage.getItem('token_usuario'))){
        this.CerrarSesion();
      }
    }
    this.bnIdle.startWatching(21600).subscribe((isTimedOut: boolean) => {
        this.CerrarSesion()
    });
    if(localStorage.getItem("sindicatos")===null){
      this.guardarSindicatos();
    }
  }

  guardarSindicatos(){

    this.sindicatosService.ObtenerSindicatos().subscribe(sindicatos=>{
      let nuevaLista: any[] = [];
      sindicatos.forEach(sindicato=>{
        nuevaLista.push(Object.keys(sindicato).reduce(function(obj, k) {
          if (k == 'id_sindicato' || k=='nombre') 
          {
            obj[k] = sindicato[k];
          }
          return obj;
        }, {}));
      })
      nuevaLista.sort(function (a, b) {
        if (a.id_sindicato > b.id_sindicato) {
          return 1;
        }
        if (a.id_sindicato < b.id_sindicato) {
          return -1;
        }
        return 0;
      });
      localStorage.setItem('sindicatos',JSON.stringify(nuevaLista));
    })

  }
  
  isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }

  CerrarSesion(){
    const datos ={nombre_usuario: localStorage.getItem('nombre_usuario')}
    this.autenticacionService.Salir(datos).subscribe((resultado)=>{
      localStorage.clear();
      this.router.navigateByUrl(`/`).then(() => {
        window.location.reload();
      });
    })
  }

  async initFirebase(){
    firebase.initializeApp(environment.firebaseConfig);
  }
}
