import { Persona, Evento } from ".";

export class Propuesta{
    public idPropuesta: Number;
    public evento: Evento;
    public postulante: Persona;
    public fecha_postulacion: Date;
    public titulo:string;    
    public descripcion:string;    
    public publico_dirigido:string;    
    public conocimiento_previo:string;    
    public cantidad_sesiones:number;
    public evaluadoresAsignados: Array<Persona>;  
    public estado: string;  
}