import { Propuesta } from "./propuesta";

export class Evaluacion{
    public idEvaluacion: Number;
    public idPropuesta: Number;
    public idEvaluador: Number;
    public idFase: Number;

    public opinion: String;
    public veredicto: String;
    public evaluado: boolean;
    public abierto: boolean;
    public propuesta: Propuesta;
}