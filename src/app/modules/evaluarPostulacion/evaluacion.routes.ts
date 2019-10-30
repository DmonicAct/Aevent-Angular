
import {ListaEvaluacionComponent} from './evaluacion/listaEvaluacion.component'
import {EditarEvaluacionComponent} from './evaluacion/editar/editarEvaluacion.component'

export const GestionEvaluacionRoutes= [  
    {path: '', component:ListaEvaluacionComponent},
    {path: 'evaluar/:id', component:EditarEvaluacionComponent},
];