export class Pasaje{
    nombre_completo : string;
    precio : number;
    pagado : boolean;
    asiento: string;
    celular: number
    carnet_pasajero : number;
    id_pasaje : number;
    id_viaje : number;
    viaje: {
        id_viaje: number;
        id_carnet_conductor: number;
        numero_turno: number;
        ubicacion: string;
        hora_salida: string;
        hora_llegada: string;
        aporte: string;
        id_turno: number;
        origen: string;
        destino: string;
        disponibilidad: number;
        fecha: Date;
        conductore: {
            activo: boolean,
            apellido_materno: string,
            apellido_paterno: string,
            carnet: number,
            ciudad: string,
            fecha_nacimiento: Date,
            grupo: string,
            id_auto_1: string,
            id_auto_2: string,
            id_sindicato:number,
            nombre: string,
            sindicato: {
                id_sindicato: number;
                nombre: string;
                estado: boolean;
                ciudad: string;
            }
        };
        turno:{
            fecha: Date,
            grupo: string,
            id_sindicato: number,
            id_turno: number,
        };
    }
}