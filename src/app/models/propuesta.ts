import { Persona, Evento } from ".";

export class Propuesta{
    public idPropuesta: Number;
    //public idEvento: Number;

    public evento: Evento;
    public postulante: Persona;
    public fecha_postulacion: Date;
    public titulo:string;
    
    
    
    //public documentos: Array<Document>;    
    
    public evaluadoresAsignados: Array<Persona>;    
    //public titulo: String; 
}