import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sindicato } from '../modelos/sindicato';
import { UserData } from '../commons/UserData'

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization': "Bearer "+ UserData.jwt,
    'Sindicato': UserData.sindicato,
    'Role': UserData.role
  })
}
@Injectable({
  providedIn: 'root'
})
export class ServicioSindicatosService {

  baseUrl: string = environment.urlApi + "/sindicatos";
  constructor(private http:HttpClient) { }

  ObtenerSindicatos(): Observable<Sindicato[]>{
    return this.http.get<Sindicato[]>(this.baseUrl);
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

  ActivarSindicato(id_sindicato:number):Observable<any>{
    return this.http.put(`${this.baseUrl}/gestion/${id_sindicato}`,null, httpOptions );
  }
}
