import { Division, Seccion, TipoSeccion, Pregunta } from "../models";

export class UtilFormulario{
    public inicializarFormulario(): Array<Division>{
        let divisionList = new Array<Division>();
        let division = new Division();
        /** 
         * 
         * Division: Datos Personales
         * 
         * 
        */
        
        division.descripcion = "Datos de Postulante";
        division.indice=1;
        division.seccionList=new Array<Seccion>();
        let seccion = new Seccion();
        seccion.indice=1;
        seccion.tipoSeccion = TipoSeccion.PREGUNTA_FORMULARIO;
        seccion.descripcion="Datos Personales"
        seccion.preguntaList = new Array<Pregunta>();

        let pregunta = new Pregunta();
        pregunta.indice = 1;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_FORMULARIO;
        pregunta.descripcion = "Nombre";
        seccion.preguntaList.push(pregunta);

        pregunta = new Pregunta();
        pregunta.indice = 2;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_FORMULARIO;
        pregunta.descripcion = "Apellido Paterno";
        seccion.preguntaList.push(pregunta);

        pregunta = new Pregunta();
        pregunta.indice = 3;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_FORMULARIO;
        pregunta.descripcion = "Apellido Materno";
        seccion.preguntaList.push(pregunta);

        pregunta = new Pregunta();
        pregunta.indice = 4;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_FORMULARIO;
        pregunta.descripcion = "Direccion";
        seccion.preguntaList.push(pregunta);

        pregunta = new Pregunta();
        pregunta.indice = 5;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_FORMULARIO;
        pregunta.descripcion = "Telefono";
        seccion.preguntaList.push(pregunta);

        division.seccionList.push(seccion);
        
        seccion = new Seccion();
        seccion.tipoSeccion = TipoSeccion.PREGUNTA_FORMULARIO;
        seccion.indice=2
        seccion.descripcion="Informacion Profesional"
        seccion.preguntaList= new Array<Pregunta>();

        pregunta = new Pregunta();
        pregunta.indice = 1;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_FORMULARIO;
        pregunta.descripcion = "Ocupacion Actual";
        seccion.preguntaList.push(pregunta);

        pregunta = new Pregunta();
        pregunta.indice = 2;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_FORMULARIO;
        pregunta.descripcion = "Puesto";
        seccion.preguntaList.push(pregunta);

        pregunta = new Pregunta();
        pregunta.indice = 3;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_FORMULARIO;
        pregunta.descripcion = "Especialidad";
        seccion.preguntaList.push(pregunta);

        division.seccionList.push(seccion);
        divisionList.push(division);

        return divisionList;
    }
}