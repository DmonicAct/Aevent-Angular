import { FormularioCFP, Persona } from ".";
import { Fase } from ".";

export class Evento{
    public id:number;
    public descripcion:string;
    public fechaInicio: Date;
    public fechaFin: Date;
    public capacidad: number;
    public organizador: Persona;
    public tipoEvento:string;
    public estado:string;
    public formulario: FormularioCFP;
    public fases: Array<Fase>;
}