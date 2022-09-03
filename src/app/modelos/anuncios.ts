export class Anuncio{
    id_anuncio: number;
    id_sindicato : number;
    titulo : string;
    detalle : string;
    fecha : Date;
    celular_referencia : number;
    sindicato:{
        id_sindicato: number;
        nombre: string;
        estado: boolean;
        ciudad: string;
    };
}