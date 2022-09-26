import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../modelos/turno';
import { environment } from '../../environments/environment'
import { userData } from '../commons/userData'

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization': "Bearer "+ userData.jwt,
    'Sindicato': userData.sindicato
  })
}

@Injectable({
  providedIn: 'root'
})
export class ServicioTurnosService {

  baseUrl: string =  environment.urlApi + "/turnos";

  constructor(private http:HttpClient) { }

  ObtenerTurnos(): Observable<Turno[]>{
    return this.http.get<Turno[]>(this.baseUrl, httpOptions);
  }

  ObtenerTurnosPorSindicato(id_sindicato:number): Observable<Turno[]>{
    return this.http.get<Turno[]>(`${this.baseUrl}/sindicato/${id_sindicato}`, httpOptions);
  }

  CrearTurno(turno:Turno):Observable<Turno>{
    return this.http.post<any>(this.baseUrl, turno, httpOptions);
  }

  ObtenerTurno(id_turno:number):Observable<Turno>{
    return this.http.get<Turno>(this.baseUrl+"/"+id_turno, httpOptions);
  }
    
  EditarTurno(turno:Turno):Observable<any>{
    return this.http.put(`${this.baseUrl}/${turno.id_turno}`, turno, httpOptions );
  }

  EliminarTurno(id_turno:number):Observable<any>{
    return this.http.delete<any>(this.baseUrl + "/" + id_turno, httpOptions)
  }
}
