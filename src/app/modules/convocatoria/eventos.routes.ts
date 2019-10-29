//import {EditarGestionarEventoComponent} from './gestion_eventos/editar/editar.component';
import {ListaEventos} from './listaEventos/listaEventos.component';
import {PostularEvento} from './postular/postular.component';

export const EventosPonentesRoutes= [  
    {path: '', component:ListaEventos},
    {path: 'postular/:id', component:PostularEvento},
];