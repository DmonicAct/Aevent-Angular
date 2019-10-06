import { TipoSeccion, Pregunta } from ".";

export class Seccion{
    public indice: number;
    public descripcion: string;
    public tipoSeccion: TipoSeccion;
    public cantidadPreguntas: number;
    public preguntas: Array<Pregunta>;

}