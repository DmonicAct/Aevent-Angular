import {ListaEventosOrganizador} from './gestion_eventos/lista.component';
import {EditarGestionarEventoComponent} from './gestion_eventos/editar/editar.component';
import {ListaEventosPresidente} from '../gestionar_eventos/presidente/listaPresidente.component';
import { VerEventoPresidenteComponent } from '../gestionar_eventos/presidente/pestañas/ver.component';

export const GestionOrganizadorRoutes= [  
    {path: 'organizador', component:ListaEventosOrganizador},
    {path: 'organizador/nuevo', component:EditarGestionarEventoComponent},
    {path: 'organizador/editar/:id', component: EditarGestionarEventoComponent},
    {path: 'presidente', component:ListaEventosPresidente},
    {path: 'presidente/ver/:id', component:VerEventoPresidenteComponent},
];