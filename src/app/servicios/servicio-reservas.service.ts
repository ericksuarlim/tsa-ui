import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserva } from '../modelos/reserva';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ServicioReservasService {
  baseUrl: string = environment.urlApi + "/reservas";
  constructor(private http:HttpClient) { }

  ObtenerReservas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.baseUrl);
  }

  CrearReserva(reserva:Reserva):Observable<Reserva>{
    return this.http.post<any>(this.baseUrl, reserva, httpOptions);
  }

  ObtenerReserva(id_reserva:number):Observable<Reserva>{
    return this.http.get<Reserva>(this.baseUrl+"/"+id_reserva);
  }
    
  EditarReserva(reserva:Reserva):Observable<any>{
    return this.http.put(`${this.baseUrl}/${reserva.id_reserva}`, reserva, httpOptions );
  }

  EliminarReserva(id_reserva:number):Observable<any>{
    return this.http.delete<any>(this.baseUrl + "/" + id_reserva)
  }
}
