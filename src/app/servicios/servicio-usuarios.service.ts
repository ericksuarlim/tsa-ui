import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../modelos/usuario';


const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuariosService {

  baseUrl: string = environment.urlApi + "/usuarios";

  constructor(private http:HttpClient) { }

  ObtenerUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  ObtenerUsuariosFiltrados(id_sindicato:number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.baseUrl+"/gestion?sindicato="+id_sindicato);
  }


  ObtenerCantidadUsuarios(): Observable<number>{
    return this.http.get<number>(this.baseUrl+"/cantidad");
  }

  HabilitarUsuario(id_usuario:number):Observable<any>{
    return this.http.put(`${this.baseUrl}/gestion/${id_usuario}`, httpOptions );
  }

  CrearUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<any>(this.baseUrl, usuario, httpOptions);
  }

  CrearUsuarios(usuarios:Usuario[]):Observable<Usuario>{
    return this.http.post<any>(this.baseUrl, usuarios, httpOptions);
  }

  ObtenerUsuario(id_usuario:number):Observable<Usuario>{
    return this.http.get<Usuario>(this.baseUrl+"/"+id_usuario);
  }
    
  EditarUsuario(usuario:Usuario):Observable<any>{
    return this.http.put(`${this.baseUrl}/${usuario.id_usuario}`, usuario, httpOptions );
  }

  EliminarUsuario(id_usuario:number):Observable<any>{
    return this.http.delete<any>(this.baseUrl + "/" + id_usuario)
  }
}
