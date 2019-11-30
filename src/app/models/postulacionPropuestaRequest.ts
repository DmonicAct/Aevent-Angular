import { Propuesta } from "./propuesta";
import { Postulacion } from "./postulacion";

export class PostulacionPropuestaRequest{
    public postulaciones:Array<Postulacion>;
    public propuestas:Array<Propuesta>;
}