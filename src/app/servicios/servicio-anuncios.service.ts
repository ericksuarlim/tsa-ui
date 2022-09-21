import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Anuncio } from '../modelos/anuncios';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ServicioAnunciosService {

  baseUrl: string = environment.urlApi + "/anuncios";

  constructor(private http:HttpClient) { }

  ObtenerAnuncios(): Observable<Anuncio[]>{
    return this.http.get<Anuncio[]>(this.baseUrl);
  }

  ObtenerAnunciosPorSindicato(id_sindicato:number): Observable<Anuncio[]>{
    return this.http.get<Anuncio[]>(`${this.baseUrl}/sindicato/${id_sindicato}`);
  }

  CrearAnuncio(anuncio:Anuncio):Observable<Anuncio>{
    return this.http.post<any>(this.baseUrl, anuncio, httpOptions);
  }

  ObtenerAnuncio(id_anuncio:number):Observable<Anuncio>{
    return this.http.get<Anuncio>(this.baseUrl+"/"+id_anuncio);
  }
    
  EditarAnuncio(anuncio:Anuncio):Observable<any>{
    return this.http.put(`${this.baseUrl}/${anuncio.id_anuncio}`, anuncio, httpOptions );
  }

  EliminarAnuncio(id_anuncio:number):Observable<any>{
    return this.http.delete<any>(this.baseUrl + "/" + id_anuncio)
  }
}
