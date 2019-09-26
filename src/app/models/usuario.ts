import { Estado } from "./enums/estado";

export class Usuario{
    public idUsuario : Number;
    public username : string;
    public email : string;
    public password :string;
    public estado : Estado;
    public roles: string[] = [];
}