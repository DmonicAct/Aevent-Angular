import {GestionUsuarioListaComponent} from './gestionUsuarios/lista.component';
import {EditarUsuarioComponent}from './gestionUsuarios/editar/editar.component';
import {GestionCategoriaListaComponent} from './GestionCategorias/lista.component';
import {EditarCategoriaComponent}from './GestionCategorias/editar/editar.component';
import {GestionTipoEventoListaComponent} from './GestionTipoEvento/lista.component';
import {EditarTipoEventoComponent}from './GestionTipoEvento/editar/editar.component';
import {GestionLugarListaComponent}from './GestionLugar/lista.component';

export const GestionUsuariosRoutes = [  
    {path: '', component: GestionUsuarioListaComponent },
    {path: 'nuevo', component: EditarUsuarioComponent },
    {path: 'editar/:id', component: EditarUsuarioComponent }
];

export const GestionCategoriasRoutes = [  
    {path: '', component: GestionCategoriaListaComponent },
    {path: 'nuevo', component: EditarCategoriaComponent },
    {path: 'editar/:id', component: EditarCategoriaComponent }
];

export const GestionTipoEventoRoutes = [  
    {path: '', component: GestionTipoEventoListaComponent },
    {path: 'nuevo', component: EditarTipoEventoComponent },
    {path: 'editar/:id', component: EditarTipoEventoComponent }
];

export const GestionLugarRoutes = [  
    {path: '', component: GestionLugarListaComponent },
];