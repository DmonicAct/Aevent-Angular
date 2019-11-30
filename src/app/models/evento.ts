import { FormularioCFP, Persona, Categoria, TipoEvento, Lugar, Usuario } from ".";
import { Fase } from ".";

export class Evento{
    public idEvento?:number;
    public titulo?: string;
    public descripcion?:string;
    public fechaInicio?: Date;
    public fechaFin?: Date;
    public capacidad?: number;
    public organizador?: Persona;
    public presidente?: Persona;
    public comite?: Array<Usuario>;
    public tipoEvento?:TipoEvento;
    public categorias?: Array<Categoria>;
    public lugar?: Lugar;
    public enabled?:Boolean;
    public fases?: Array<Fase>;
    public motivoFin?: string;
    public estadoEvento?: string;
    constructor(){
        this.estadoEvento = 'EVENTO_BORRADOR';
        this.idEvento = null;
        this.fases=new Array<Fase>();
        this.categorias = new Array<Categoria>();
        this.comite = new Array<Usuario>();
    }
}