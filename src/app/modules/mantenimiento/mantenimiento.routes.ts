import {GestionUsuarioListaComponent} from './gestionUsuarios/lista.component';
import {EditarUsuarioComponent}from './gestionUsuarios/editar/editar.component';
import {GestionCategoriaListaComponent} from './GestionCategorias/lista.component';
import {GestionTipoEventoListaComponent} from './GestionTipoEvento/lista.component';

export const GestionUsuariosRoutes = [  
    {path: '', component: GestionUsuarioListaComponent },
    {path: 'nuevo', component: EditarUsuarioComponent },
];

export const GestionCategoriasRoutes = [  
    {path: '', component: GestionCategoriaListaComponent },
];

export const GestionTipoEventoRoutes = [  
    {path: '', component: GestionTipoEventoListaComponent },
];