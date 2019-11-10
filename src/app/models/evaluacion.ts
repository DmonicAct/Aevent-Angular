import { Propuesta } from "./propuesta";
import { Usuario, Fase } from ".";

export class Evaluacion{
    public idEvaluacion: Number;
    public evaluador: Usuario;
    public fase: Fase;
    public propuesta: Propuesta;

    /*
    public idPropuesta: Number;
    public idEvaluador: Number;
    public idFase: Number;
*/
    public opinion: String;
    public veredicto: String;
    public evaluado: boolean;
    public abierto: boolean;
    public sigueEvaluando: boolean;
 //   public propuesta: Propuesta;
}