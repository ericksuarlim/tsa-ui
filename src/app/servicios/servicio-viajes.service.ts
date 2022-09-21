import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Viaje } from '../modelos/viaje';
import { environment } from '../../environments/environment'

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ServicioViajesService {

  baseUrl: string = environment.urlApi + "/viajes";

  constructor(private http:HttpClient) { }

  ObtenerViajesPorSindicato(id_sindicato:number): Observable<Viaje[]>{
    return this.http.get<Viaje[]>(`${this.baseUrl}/sindicato/${id_sindicato}`);
  }

  ObtenerViajes(): Observable<Viaje[]>{
    return this.http.get<Viaje[]>(this.baseUrl);
  }

  CrearViaje(viaje:Viaje):Observable<Viaje>{
    return this.http.post<any>(this.baseUrl, viaje, httpOptions);
  }

  CrearViajes(viajes:Viaje[]):Observable<Viaje>{
    return this.http.post<any>(this.baseUrl + "/grupo", viajes, httpOptions);
  }

  ObtenerViaje(id_viaje:number):Observable<Viaje>{
    return this.http.get<Viaje>(this.baseUrl+"/"+id_viaje);
  }
    
  EditarViaje(viaje:Viaje):Observable<any>{
    return this.http.put(`${this.baseUrl}/${viaje.id_viaje}`, viaje, httpOptions );
  }

  EliminarViaje(id_viaje:number):Observable<any>{
    return this.http.delete<any>(this.baseUrl + "/" + id_viaje)
  }
}