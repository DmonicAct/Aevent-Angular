import { Criterio } from ".";


export class Fase{
    public idFase: number;
    public descipcion: string;
    public fechaInicial: Date;
    public fechaFin: Date;
    public criterios: Array<Criterio>;
}