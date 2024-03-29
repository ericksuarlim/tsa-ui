import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Encomienda } from '../modelos/encomienda';
import { UserData } from '../commons/UserData'


const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization': "Bearer "+ UserData.jwt,
    'Sindicato': UserData.sindicato
  })
}

@Injectable({
  providedIn: 'root'
})
export class ServicioEncomiendasService {

  
  baseUrl: string = environment.urlApi + "/encomiendas";

  constructor(private http:HttpClient) { }

  ObtenerEncomiendasPorSindicato(id_sindicato:number): Observable<Encomienda[]>{
    return this.http.get<Encomienda[]>(`${this.baseUrl}/sindicato/${id_sindicato}`);
  }

  ObtenerEncomiendas(): Observable<Encomienda[]>{
    return this.http.get<Encomienda[]>(this.baseUrl);
  }

  CrearEncomienda(encomienda:Encomienda):Observable<Encomienda>{
    return this.http.post<any>(this.baseUrl, encomienda, httpOptions);
  }

  ObtenerEncomienda(id_encomienda:number):Observable<Encomienda>{
    return this.http.get<Encomienda>(this.baseUrl+"/"+id_encomienda);
  }
    
  EditarEncomienda(encomienda:Encomienda):Observable<any>{
    return this.http.put(`${this.baseUrl}/${encomienda.id_encomienda}`, encomienda, httpOptions );
  }

  EliminarEncomienda(id_encomienda:number):Observable<any>{
    return this.http.delete<any>(this.baseUrl + "/" + id_encomienda, httpOptions)
  }
}
