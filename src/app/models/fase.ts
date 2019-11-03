import { Criterio, Evento } from ".";

export class Fase{
    public idFase: number;
    public descripcion: String;
    public fechaInicial: Date;
    public fechaFin: Date;
    public criterios: Array<Criterio>;
    public idEvento: number;
}