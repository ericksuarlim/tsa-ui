export class Reserva{
    id_reserva: number;
    id_sindicato: number;
    id_viaje: number;
    fecha: string;
    celular: number;
    nombre_completo_reserva: string;
    estado: string;
    cantidad: number;
    sindicato: {
        id_sindicato: number;
        nombre: string;
        estado: boolean;
        ciudad: string;
    };
}