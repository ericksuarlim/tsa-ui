import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sindicato } from '../modelos/sindicato';
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
export class ServicioSindicatosService {

  baseUrl: string = environment.urlApi + "/sindicatos";
  constructor(private http:HttpClient) { }

  ObtenerSindicatos(): Observable<Sindicato[]>{
    return this.http.get<Sindicato[]>(this.baseUrl, httpOptions);
  }

  CrearSindicato(sindicato:Sindicato):Observable<Sindicato>{
    return this.http.post<any>(this.baseUrl, sindicato, httpOptions);
  }

  ObtenerSindicato(id_sindicato:number):Observable<Sindicato>{
    return this.http.get<Sindicato>(this.baseUrl+"/"+id_sindicato, httpOptions);
  }
    
  EditarSindicato(sindicato:Sindicato):Observable<any>{
    return this.http.put(`${this.baseUrl}/${sindicato.id_sindicato}`, sindicato, httpOptions );
  }

  EliminarSindicato(id_sindicato:number):Observable<any>{
    return this.http.delete<any>(this.baseUrl + "/" + id_sindicato, httpOptions)
  }
}
