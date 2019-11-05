
import {ListaEvaluacionComponent} from './evaluacion/listaEvaluacion.component'
import {EditarEvaluacionComponent} from './evaluacion/editar/editarEvaluacion.component'
import {ListaPreferenciasComponent} from './preferencias-evaluacion/listaPreferenciasEvaluacion.component'

export const GestionEvaluacionRoutes= [  
    {path: '', component:ListaEvaluacionComponent},
    {path: 'preferencias', component:ListaPreferenciasComponent},
    {path: 'evaluar/:id', component:EditarEvaluacionComponent},
];