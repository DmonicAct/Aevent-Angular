import { OnInit, Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Evento, Persona, TipoEvento, Lugar, Categoria, Response, Division, RespuestaFormulario} from '../../../../../../models'
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
import { stringify } from "querystring";
@Component({
    selector: 'detalle-propuesta',
    templateUrl: 'detalle-propuesta.template.html',
    styleUrls: ['detalle-propuesta.template.scss']
})

export class DetallePropuestaComponent implements OnInit {

    @Input('item-division')
    public items: Array<Division>;

    @Input('item-respuesta')
    public respuesta: Array<RespuestaFormulario>;
    
    constructor(private toastr: ToastrService,
      ) {
        this.items= new Array<Division>();
        this.respuesta= new Array<RespuestaFormulario>();
        
        this.respuesta.forEach(element => {
            element.respuesta="";
        });
      }

    ngOnInit(): void {
        //this.items = this.items.fase.formulario.divisionList;
    }
}