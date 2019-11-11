import { Persona, Evento } from ".";

export class Propuesta{
    public idPropuesta: Number;
    public evento: Evento;
    public postulante: Persona;
    public fecha_postulacion: Date;
    public titulo:string;    
    public evaluadoresAsignados: Array<Persona>;    
}