import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conductor } from '../modelos/conductor';
import { environment } from '../../environments/environment'

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ServicioConductoresService {

  baseUrl: string = environment.urlApi + "/conductores";

  constructor(private http:HttpClient) { }
    //Obtener registros de conductores

  ObtenerConductores(): Observable<Conductor[]>{
    return this.http.get<Conductor[]>(this.baseUrl);
  }

  CrearConductor(conductor:Conductor):Observable<Conductor>{
    return this.http.post<any>(this.baseUrl, conductor, httpOptions);
  }

  ObtenerConductor(carnet:number):Observable<Conductor>{
    return this.http.get<Conductor>(this.baseUrl+"/"+carnet);
  }
    
  EditarConductor(conductor:Conductor):Observable<any>{
    return this.http.put(`${this.baseUrl}/${conductor.carnet}`, conductor, httpOptions );
  }

  EliminarConductor(carnet:number):Observable<any>{
    return this.http.delete<any>(this.baseUrl + "/" + carnet)
  }
}
