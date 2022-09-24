export class userData {
    public static jwt: string = localStorage.getItem('token_usuario');
    public static sindicato: string = localStorage.getItem('id_sindicato_usuario');
    public static role: string = localStorage.getItem('rol_usuario');
}