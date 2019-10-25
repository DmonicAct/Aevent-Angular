import {ListaEventosPresidente} from './presidente/listaPresidente.component';
import { DetalleEventoVer } from './presidente/pestañas/detalle-evento/detalleEventoPresidente.component';
import { VerEventoPresidenteComponent } from './presidente/pestañas/ver.component';
//import {EditarGestionarEventoComponent} from './gestion_eventos/editar/editar.component';

export const GestionPresidenteRoutes= [  
    {path: '', component:ListaEventosPresidente},
    {path: 'ver/:id', component:VerEventoPresidenteComponent},
];