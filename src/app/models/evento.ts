import { FormularioCFP, Persona, Categoria, TipoEvento, Lugar } from ".";
import { Fase } from ".";

export class Evento{
    public idEvento:number;
    public descripcion:string;
    public fechaInicio: Date;
    public fechaFin: Date;
    public capacidad: number;
    public organizador: Persona;
    public presidente: Persona;
    public comite: Array<Persona>;
    public tipoEvento:TipoEvento;
    public categorias: Array<Categoria>;
    public lugar: Lugar;
    public estado:string;
    public formulario: FormularioCFP;
    public fases: Array<Fase>;
    constructor(){
        this.idEvento=-1;
        this.fases=new Array<Fase>();
        this.categorias = new Array<Categoria>();
    }
}