import { TipoPregunta, Pregunta } from ".";

export class Seccion{
    public indice: number;
    public descripcion: string;
    public tipoSeccion: TipoPregunta;
    public cantidadPreguntas: number;
    public preguntas: Array<Pregunta>;

}