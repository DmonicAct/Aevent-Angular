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
        seccion.tipoSeccion = TipoSeccion.PREGUNTA_ABIERTA;
        seccion.descripcion="Datos Personales"
        seccion.preguntaList = new Array<Pregunta>();

        let pregunta = new Pregunta();
        pregunta.indice = 1;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_ABIERTA;
        pregunta.descripcion = "Nombre";
        pregunta.maxCaracteres = 30;
        seccion.preguntaList.push(pregunta);

        pregunta = new Pregunta();
        pregunta.indice = 2;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_ABIERTA;
        pregunta.descripcion = "Apellido Paterno";
        pregunta.maxCaracteres = 30;
        seccion.preguntaList.push(pregunta);

        pregunta = new Pregunta();
        pregunta.indice = 3;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_ABIERTA;
        pregunta.descripcion = "Apellido Materno";
        pregunta.maxCaracteres = 30;
        seccion.preguntaList.push(pregunta);

        pregunta = new Pregunta();
        pregunta.indice = 4;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_ABIERTA;
        pregunta.descripcion = "Direccion";
        pregunta.maxCaracteres = 50;
        seccion.preguntaList.push(pregunta);

        pregunta = new Pregunta();
        pregunta.indice = 5;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_ABIERTA;
        pregunta.descripcion = "Telefono";
        pregunta.maxCaracteres = 20;
        seccion.preguntaList.push(pregunta);

        division.seccionList.push(seccion);
        divisionList.push(division);

        division = new Division();
        division.descripcion = "Informacion Profesional";
        division.indice=2;
        division.seccionList=new Array<Seccion>();

        seccion = new Seccion();
        seccion.tipoSeccion = TipoSeccion.PREGUNTA_ABIERTA;
        seccion.indice=1
        seccion.descripcion="Informacion Profesional"
        seccion.preguntaList= new Array<Pregunta>();

        pregunta = new Pregunta();
        pregunta.indice = 1;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_ABIERTA;
        pregunta.descripcion = "Ocupacion Actual";
        pregunta.maxCaracteres = 100;
        seccion.preguntaList.push(pregunta);

        pregunta = new Pregunta();
        pregunta.indice = 2;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_ABIERTA;
        pregunta.descripcion = "Puesto";
        pregunta.maxCaracteres = 100;
        seccion.preguntaList.push(pregunta);

        pregunta = new Pregunta();
        pregunta.indice = 3;
        pregunta.tipoSeccion =  TipoSeccion.PREGUNTA_ABIERTA;
        pregunta.descripcion = "Especialidad";
        pregunta.maxCaracteres = 100;
        seccion.preguntaList.push(pregunta);

        division.seccionList.push(seccion);
        divisionList.push(division);

        return divisionList;
    }
}