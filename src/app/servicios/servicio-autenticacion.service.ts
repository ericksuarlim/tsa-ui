import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserData } from '../commons/UserData'

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization': "Bearer "+ UserData.jwt
  })
}

@Injectable({
  providedIn: 'root'
})
export class ServicioAutenticacionService {

  baseUrl: string = environment.urlApi + "/sesion";

  constructor(private http:HttpClient) { }
    //Obtener registros de conductores

  Salir(datos_usuario:any): Observable<any>{
    return this.http.post<any>(this.baseUrl+"/salir", datos_usuario, httpOptions);
  }

  Entrar(datos_usuario:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+"/entrar", datos_usuario, httpOptions);
  }

  SolicitudRestablecerPassword(datos_usuario:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+"/solicitud-password", datos_usuario, httpOptions);
  }

  RestablecerPassword(datos_usuario:any): Observable<any>{
    return this.http.post<any>(this.baseUrl+"/restablecer-password", datos_usuario, httpOptions)
  }
    
  
}
