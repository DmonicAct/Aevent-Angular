import { Usuario } from "./usuario";

export class Persona extends Usuario{
    public nombre : String;
    public appaterno : String;
    public apmaterno : String;
    public dni: String;
    public direccion: String;
    public sexo: String;
    public edad: number;
    public fechaNacimiento: Date;
}