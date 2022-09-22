import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import { BnNgIdleService } from 'bn-ng-idle';
import { ServicioAutenticacionService } from './servicios/servicio-autenticacion.service';
import { Router } from '@angular/router';

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
    await firebase.initializeApp(environment.firebaseConfig);
  }
}
