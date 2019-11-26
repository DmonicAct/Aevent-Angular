import { Persona, Evento } from ".";

export class Propuesta{
    public idPropuesta: number;
    public evento: Evento;
    public postulante: Persona;
    public fecha_postulacion: Date;
    public titulo:string; 
    public fase_actual: number;
    public evaluadoresAsignados: Array<Persona>;  
    public estado: string;  
}