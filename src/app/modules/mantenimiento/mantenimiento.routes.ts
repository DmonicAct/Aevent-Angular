import {GestionUsuarioListaComponent} from './gestionUsuarios/lista.component';
import {EditarUsuarioComponent}from './gestionUsuarios/editar/editar.component';

export const GestionUsuariosRoutes = [  
    {path: '', component: GestionUsuarioListaComponent },
    {path: 'nuevo', component: EditarUsuarioComponent },
    {path: 'editar/{id}', component: EditarUsuarioComponent }
];