export class Usuario{
    id_usuario : number;
    carnet: number;
    nombres : string;
    apellido_paterno : string;
    apellido_materno : string;
    celular_referencia : number;
    correo_electronico : string;
    id_sindicato : number;
    nombre_usuario : string;
    password : string;
    rol : string;
    habilitado: boolean;
    sindicato: {
        id_sindicato: number;
        nombre: string;
        estado: boolean;
        ciudad: string;
    }
}