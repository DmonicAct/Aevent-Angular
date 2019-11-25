
import {ListaEvaluacionComponent} from './evaluacion/listaEvaluacion.component'
import {EditarEvaluacionComponent} from './evaluacion/editar/editarEvaluacion.component'
import {ListaPreferenciasComponent} from './preferencias-evaluacion/listaPreferenciasEvaluacion.component'
import {ListaEvaluacionFinalComponent} from './evaluacionFinal/listaEvaluacionFinal.component'
import {DetalleEvaluacionFinal} from './evaluacionFinal/detalles/detalle.component'

export const GestionEvaluacionRoutes= [  
    {path: '', component:ListaEvaluacionComponent},
    {path: 'preferencias', component:ListaPreferenciasComponent},
    {path: 'evaluar/:id', component:EditarEvaluacionComponent},
    {path: 'lista', component:ListaEvaluacionFinalComponent},
    {path: 'lista/evaluar/:id', component:DetalleEvaluacionFinal}
];