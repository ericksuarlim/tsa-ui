export class Encomienda{
    id_encomienda : number;
    id_viaje : number;
    nombre_cliente : string;
    monto_pago : number;
    carnet_cliente: number;
    pagada: boolean;
    celular_cliente: number;
    cantidad_bultos: number;
    detalle: string;
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