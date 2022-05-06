export class Turno{
    id_turno: number;
    fecha: string;
    grupo: string;
    id_sindicato: string;
    viajes:{
        id_viaje: number;
        id_carnet_conductor: number,
        numero_turno: number,
        estado: string,
        hora_salida: string,
        hora_llegada: string,
        aporte: string,
        id_turno: number
    }[]=[];
}

