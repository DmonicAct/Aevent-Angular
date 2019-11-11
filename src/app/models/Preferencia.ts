import { Usuario } from ".";
import { Propuesta } from "./propuesta";


export class Preferencia{
    public id: number;
    public usuario: Usuario;
    public propuesta: Propuesta;
    public descripcion: String;
}