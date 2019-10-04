import {TipoPregunta} from './enums/tipo-pregunta';
export class Pregunta{
    public idPregunta: number;
    public descripcion: string;
    public subDescipcion: string; //cambiar en spring
    public tipoPregunta: TipoPregunta;
}