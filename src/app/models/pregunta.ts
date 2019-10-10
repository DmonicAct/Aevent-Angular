import {TipoSeccion} from './enums/tipo-seccion';
export class Pregunta{
    public idPregunta: number;
    public indice: number;
    public descripcion: string;
    //public subDescipcion: string; //cambiar en spring
    public tipoSeccion: TipoSeccion;
    public cantidadLetras: number;
}