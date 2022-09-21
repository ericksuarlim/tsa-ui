import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js'
import { Usuario } from 'src/app/modelos/usuario';
import { ServicioUsuariosService } from 'src/app/servicios/servicio-usuarios.service';

@Component({
  selector: 'app-detalles-usuario',
  templateUrl: './detalles-usuario.component.html',
  styleUrls: ['./detalles-usuario.component.css']
})
export class DetallesUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  sindicatoUsuario: number;
  datosRevisados: boolean= false;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private servicioUsuarios: ServicioUsuariosService
  ) { }

  ngOnInit(): void {
    const id_usuario = this.route.snapshot.params["id_usuario"];
    this.sindicatoUsuario = Number(localStorage.getItem('id_sindicato_usuario'))
    this.servicioUsuarios.ObtenerUsuario(id_usuario).subscribe(usuario=>{
      if(usuario.id_sindicato===this.sindicatoUsuario){
        this.usuario=usuario;
        this.datosRevisados = true;
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  Cerrar(){
    this.router.navigateByUrl(`/usuarios`);
  }

  EditarUsuario(id_usuario:number){
    this.router.navigate(["/usuarios/formulario"], { queryParams: { id_usuario} });
  }

  DescargarDatos(){
    const opciones ={
      filename: `Usuario+${this.usuario.id_usuario}+file.pdf`,
      image: {type: 'jpeg'},
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    const content: Element = document.getElementById('datos-usuario');
    html2pdf().from(content).set(opciones).save();
  }

}

