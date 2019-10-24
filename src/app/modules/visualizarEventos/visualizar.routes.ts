import {ListaEventosPresidente} from './presidente/listaPresidente.component';
//import {EditarGestionarEventoComponent} from './gestion_eventos/editar/editar.component';

export const GestionPresidenteRoutes= [  
    {path: '', component:ListaEventosPresidente},
    {path: 'ver/:id', component:ListaEventosPresidente},
];