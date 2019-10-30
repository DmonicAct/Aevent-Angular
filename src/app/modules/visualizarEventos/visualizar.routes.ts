import {ListaEventosPresidente} from './presidente/listaPresidente.component';
import { DetalleEventoVer } from './presidente/pestañas/detalle-evento/detalleEventoPresidente.component';
import { ComiteEventoVer } from './presidente/pestañas/comite-evento/comiteEventoPresidente.component';
import { AgregarEvaluador } from './presidente/pestañas/comite-evento/agregar-evaluador/agregar-evaluador.component';
import { VerEventoPresidenteComponent } from './presidente/pestañas/ver.component';
//import {EditarGestionarEventoComponent} from './gestion_eventos/editar/editar.component';

export const GestionPresidenteRoutes= [  
    {path: '', component:ListaEventosPresidente},
    {path: 'ver/:id', component:VerEventoPresidenteComponent},
];