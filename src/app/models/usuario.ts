import { Estado } from "./enums/estado";

export class Usuario{
    public idUsuario : number;
    public username : string;
    public email : string;
    public password :string;
    public estado : Estado;
    public roles: string[] = [];
}