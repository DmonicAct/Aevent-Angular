import { Usuario } from "./usuario";

export class Persona extends Usuario{
    public idUsuario: number;
    public nombre : String;
    public appaterno : String;
    public apmaterno : String;
    public dni: String;
    public direccion: String;
    public sexo: String;
    public edad: number;
    public fechaNacimiento: Date;
    public fullName: string;
}