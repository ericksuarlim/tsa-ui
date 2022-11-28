export class Turno{
    id_turno: number;
    fecha: Date;
    grupo: string;
    id_sindicato: number;
    viajes:{
        id_viaje: number;
        id_carnet_conductor: number,
        numero_turno: number,
        ubicacion: string,
        hora_salida: string,
        hora_llegada: string,
        aporte: string,
        id_turno: number,
        disponibilidad:number,
        origen: string,
        destino:string;
        fecha:Date;
        pasajes:{
            nombre_completo : string;
            precio : number;
            pagado : boolean;
            asiento: string;
            celular: number
            carnet_pasajero : number;
            id_pasaje : number;
            id_viaje : number;
        }[];
        encomiendas: {
            id_encomienda : number;
            id_viaje : number;
            nombre_cliente : string;
            monto_pago : number;
            carnet_cliente: number;
            pagada: boolean;
            celular_cliente: number;
            cantidad_bultos: number;
            detalle: string;
            codigo_encomienda: number;
        };
        reservas:{
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
        };
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
            };
        };
        turno:{
            fecha: Date,
            grupo: string,
            id_sindicato: number,
            id_turno: number,
        };
    }[]=[];
}

