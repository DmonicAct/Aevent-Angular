import { Propuesta } from "./propuesta";

export class Document{
    public id: Number;
    public nombredoc: String;
    public extensiondoc: String;
    public contenido: Array<Number>;
    public propuesta: Propuesta;
}