import {ListaEventosOrganizador} from './gestion_eventos/lista.component';
import {EditarGestionarEventoComponent} from './gestion_eventos/editar/editar.component';

export const GestionOrganizadorRoutes= [  
    {path: '', component:ListaEventosOrganizador},
    {path: 'nuevo', component:EditarGestionarEventoComponent},
    {path: 'editar/:id', component:EditarGestionarEventoComponent}
];