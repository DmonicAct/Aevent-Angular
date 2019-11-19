import {GestionUsuarioListaComponent} from './gestionUsuarios/lista.component';
import {EditarUsuarioComponent}from './gestionUsuarios/editar/editar.component';
import {GestionCategoriaListaComponent} from './GestionCategorias/lista.component';
import {GestionTipoEventoListaComponent} from './GestionTipoEvento/lista.component';
import {GestionLugarListaComponent}from './GestionLugar/lista.component';
import {GestionTipoCriterioListaComponent}from './GestionTipoCriterio/lista.component';

export const GestionUsuariosRoutes = [  
    {path: '', component: GestionUsuarioListaComponent },
    {path: 'nuevo', component: EditarUsuarioComponent },
    {path: 'editar/:id', component: EditarUsuarioComponent }
];

export const GestionCategoriasRoutes = [  
    {path: '', component: GestionCategoriaListaComponent },
];

export const GestionTipoEventoRoutes = [  
    {path: '', component: GestionTipoEventoListaComponent },
];

export const GestionTipoCriterioRoutes = [  
    {path: '', component: GestionTipoCriterioListaComponent },
];

export const GestionLugarRoutes = [  
    {path: '', component: GestionLugarListaComponent },
];