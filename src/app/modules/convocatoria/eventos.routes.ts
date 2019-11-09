//import {EditarGestionarEventoComponent} from './gestion_eventos/editar/editar.component';
import {ListaEventos} from './listaEventos/listaEventos.component';
import {ListaPonenciaComponent} from './listaEventos/listaPonencia.component';
import {PostularEvento} from './postular/postular.component';
import {EdicionPonenciaComponent} from './postular/edicionPonencia.component';

export const EventosPonentesRoutes= [  
    {path: '', component:ListaEventos},
    {path: 'postular/:id', component:PostularEvento},
];

export const EventosEdicionPonentes= [  
    {path: '', component:ListaPonenciaComponent},
    {path: 'ver-postulacion/:id', component:EdicionPonenciaComponent},
];