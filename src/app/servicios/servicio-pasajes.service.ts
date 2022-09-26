import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pasaje } from '../modelos/pasaje';
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
export class ServicioPasajesService {

  baseUrl: string = environment.urlApi + "/pasajes";

  constructor(private http:HttpClient) { }

  ObtenerPasajes(): Observable<Pasaje[]>{
    return this.http.get<Pasaje[]>(this.baseUrl, httpOptions);
  }

  ObtenerPasajesPorSindicato(id_sindicato:number): Observable<Pasaje[]>{
    return this.http.get<Pasaje[]>(`${this.baseUrl}/sindicato/${id_sindicato}`, httpOptions);
  }

  CrearPasaje(pasaje:Pasaje):Observable<Pasaje>{
    return this.http.post<any>(this.baseUrl, pasaje, httpOptions);
  }

  ObtenerPasaje(id_pasaje:number):Observable<Pasaje>{
    return this.http.get<Pasaje>(this.baseUrl+"/"+id_pasaje, httpOptions);
  }
    
  EditarPasaje(pasaje:Pasaje):Observable<any>{
    return this.http.put(`${this.baseUrl}/${pasaje.id_pasaje}`, pasaje, httpOptions );
  }

  EliminarPasaje(id_pasaje:number):Observable<any>{
    return this.http.delete<any>(this.baseUrl + "/" + id_pasaje, httpOptions)
  }
}
