import { Usuario } from ".";
import { Propuesta } from "./propuesta";


export class Preferencia{
    public id?:number;
    public idUsuario?:number;
    public propuesta?:Propuesta;
    public descripcion?:string;
}