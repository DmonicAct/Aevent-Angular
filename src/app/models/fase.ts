import { Criterio, Evento, FormularioCFP } from ".";

export class Fase{
    public idFase: number;
    public descripcion: String;
    public fechaInicial: Date;
    public fechaFin: Date;
    public criterios: Array<Criterio>;
    public idEvento: number;
    public formulario: FormularioCFP;
}