import { Estado } from "./enums/estado";
import { Role } from ".";

export class Usuario{
    public idUsuario : number;
    public username : string;
    public email : string;
    public password :string;
    //public password_transit: string;
    public enabled : Boolean;
    //public roles: string[] = [];
    public roles: Role[] = [];
    public fechaCreacion: Date;
    public fechaModificacion: Date;
    public nombreCompleto: string;
}