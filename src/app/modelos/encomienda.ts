export class Encomienda{
    id_encomienda : string;
    id_viaje : string;
    nombre_cliente : string;
    monto_pago : Date;
    viaje: {
        id_viaje: number;
        id_carnet_conductor: number;
        numero_turno: number;
        ubicacion: string;
        hora_salida: string;
        hora_llegada: string;
        aporte: string;
        id_turno: number;
        disponibilidad: number;
        origen: string;
        destino: string;
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
            id_sindicato:string,
            nombre: string,
        };
        turno:{
            fecha: Date,
            grupo: string,
            id_sindicato: number,
            id_turno: number,
        };
    }
}