import { Propuesta } from "./propuesta";
import { Postulacion } from "./postulacion";

export class PostulacionPropuestaRequest{
    public postulacion:Array<Postulacion>;
    public propuesta :Array<Propuesta>;
}