export class Reserva{
    id_reserva: number;
    id_sindicato: number;
    id_viaje: number;
    fecha: Date;
    celular: number;
    nombre_completo_reserva: string;
    estado: string;
    cantidad: number;
    comentario: string;
    codigo_reserva: number;
    ip_reserva: string;
    sindicato: {
        id_sindicato: number;
        nombre: string;
        estado: boolean;
        ciudad: string;
    };
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
        };
        turno:{
            fecha: Date,
            grupo: string,
            id_sindicato: number,
            id_turno: number,
        };
    }
}