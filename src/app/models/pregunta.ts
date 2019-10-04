import {TipoPregunta} from './enums/tipo-pregunta';
export class Pregunta{
    public idPregunta: number;
    public indice: number;
    public cabecera: Boolean;
    public descripcion: string;
    //public subDescipcion: string; //cambiar en spring
    public tipoPregunta: TipoPregunta;
    public cantidadLetras: number;
}