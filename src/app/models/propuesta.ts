import { Persona } from ".";

export class Propuesta{
    public idPropuesta: Number;
    public idEvento: Number;
    public idPostulante: Number;
    public fecha_postulacion: Date;
    public titulo:string;
    public documentos: Array<Document>;    
    public postulante: Persona;
    public evaluadoresAsignados: Array<Persona>;    
    public titulo: String; 
}