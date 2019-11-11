import { Propuesta } from "./propuesta";
import { Usuario, Fase } from ".";

export class Evaluacion{
    public idEvaluacion: Number;
    public evaluador: Usuario;
    public fase: Fase;
    public propuesta: Propuesta;
    public comentarioParticipante: String;
    public comentarioPresidente: String;
    public estado: String;
}