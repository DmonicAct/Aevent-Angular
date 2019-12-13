import { Propuesta } from "./propuesta";
import { Fase } from ".";

export class Document{
    public idDocumento: Number;
    public nombredoc: String;
    public extensiondoc: String;
    public contenido: Array<Number>;
    public idPropietario:number;
	public idPostulacion:number;
	public enabled:Boolean;
}