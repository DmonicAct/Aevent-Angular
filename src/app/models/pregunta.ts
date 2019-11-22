import {TipoSeccion} from './enums/tipo-seccion';
import { Seccion } from '.';
export class Pregunta{
    public idPregunta: number;
    public idSeccion:number;
    public indice: number;
    public descripcion: string;
    public tipoSeccion: TipoSeccion;
    public tipoPregunta: string;
    public maxCaracteres: number;
}