import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupraGuard implements CanActivate {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  
canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const estaDentro = localStorage.getItem('nombre_usuario')!=null;
    const rolCorrecto = localStorage.getItem('rol_usuario')==='superadministrador';
    if(estaDentro && rolCorrecto){ 
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }

}
