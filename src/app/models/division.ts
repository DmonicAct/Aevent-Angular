import { Seccion } from "./seccion";
import { FormularioCFP } from ".";

export class Division{
    public idDivision:number;
    public indice: number;
    public descripcion: string;
    public formulario: FormularioCFP;
    public seccionList: Array<Seccion>;
}