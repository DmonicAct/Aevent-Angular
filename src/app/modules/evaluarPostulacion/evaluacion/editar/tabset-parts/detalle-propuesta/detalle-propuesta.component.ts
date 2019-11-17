import { OnInit, Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Evento, Persona, TipoEvento, Lugar, Categoria, Response, Division} from '../../../../../../models'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Location } from '@angular/common';
import { PersonaService, CategoriaService, LugarService, EventoService, TipoEventoServices } from '../../../../../../services';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { AuthService as AeventAuthService } from '../../../../../../auth/service/auth.service';
import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";
import { Evaluacion } from "src/app/models/evaluacion";
@Component({
    selector: 'detalle-propuesta',
    templateUrl: 'detalle-propuesta.template.html',
    styleUrls: ['detalle-propuesta.template.scss']
})

export class DetallePropuestaComponent implements OnInit {

    @Input('item-division')
    public items: Array<Division>;
    seleccionados: any[];

    ngOnInit(): void {
        //this.items = this.items.fase.formulario.divisionList;
    }
}