import { Usuario } from "./usuario";

export class Persona extends Usuario{
    public idUsuario: number;
    public nombre : string;
    public appaterno : string;
    public apmaterno : string;
    public dni: string;
    public direccion: string;
    public sexo: string;
    public edad: number;
    public fechaNacimiento: Date;
    public fullName: string;
}