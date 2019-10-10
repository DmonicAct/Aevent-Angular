import { TipoSeccion, Pregunta } from ".";

export class Seccion{
    public idSeccion:number;
    public indice: number;
    public descripcion: string;
    public tipoSeccion: TipoSeccion;
    public cantidadPreguntas: number;
    public preguntaList: Array<Pregunta>;

}