import { OnInit, Component, Input } from "@angular/core";
import { Division, RespuestaFormulario, TipoSeccion, Fase, Postulacion } from "../../../../models";
import { RespuestaPostulacion } from "../../../../models/respuesta_postulacion";
import { TabDirective } from "ngx-bootstrap";
import { PropuestaService } from "../../../../services/propuesta.service";
import { EstadoPropuesta } from "src/app/models/enums/estadoPropuesta";
import { AuthService as AeventAuthService } from '../../../../auth/service/auth.service';
import { ToastrService } from "ngx-toastr";
declare var jQuery: any;
@Component({
    selector:'fase-propuesta',
    templateUrl:'fase-propuesta.template.html',
    styleUrls:['fase-propuesta.template.scss']
})
export class FasePropuestaComponent implements OnInit{
    @Input('idFase')
    public idFase: number;

    @Input('idEvento')
    public idEvento:number;

    @Input('idFormulario')
    public idFormulario:number;

    @Input('items')
    public items: Array<Division>;

    @Input('fase')
    public fase:Fase;

    @Input("index")
    public  index: number;

    public respuestaPostulacion: RespuestaPostulacion;

    public now_date: String = new Date().toISOString();
    public itemsRepuesta : RespuestaFormulario[][]=[];

    public postulacion: Postulacion;
    private respuestaFase : RespuestaPostulacion;
    public seleccionados: any[];
    constructor(
        private propuestaService:PropuestaService,
        private authService: AeventAuthService,
        private toastr: ToastrService
    ){
        this.postulacion = new Postulacion();
    }
    ngOnInit(){
        
        console.log(this.items);
        this.items.forEach((e,i)=>{
            let conjuntoRpta = new Array<RespuestaFormulario>();
            e.seccionList[0].preguntaList.forEach((p,i)=>{
                let respuesta = new RespuestaFormulario();
                respuesta.idFormulario=this.idFormulario;
                respuesta.idDivision=e.idDivision;
                respuesta.idSeccion=e.seccionList[0].idSeccion;
                respuesta.idPregunta=p.idPregunta;
                respuesta.tipoPregunta = TipoSeccion.PREGUNTA_ABIERTA;
                respuesta.respuesta = '';
                conjuntoRpta.push(respuesta);
            });
            this.itemsRepuesta.push(conjuntoRpta);
        });
      
        this.respuestaFase = new RespuestaPostulacion();
    }
    ngAfterViewInit() {
        jQuery('.full-height-scroll').slimscroll({
            height: '100%'
        });
    }
    cargarDatosFormulario(respuestas:RespuestaPostulacion,outer_index:number){
        if(this.index == outer_index){
           this.respuestaPostulacion = respuestas;
           this.postulacion = this.respuestaPostulacion.postulacion;
           let divArray: number[];
           let index:number = 0;
           let index_prev:number = -1;
           let index_division = -1;
           let index_pregunta = 0;
           this.respuestaPostulacion.listaFormulario.forEach((e,i)=>{
                index = e.idDivision;
                if(index==index_prev){
                    this.itemsRepuesta[index_division][index_pregunta] = e;
                    index_pregunta++;
                }else{
                    index_prev = index;
                    index_division++;
                    index_pregunta=0;
                    this.itemsRepuesta[index_division][index_pregunta] = e;
                    index_pregunta++;
                }
           });
           
        }
    }
    OnEnviar(){
        this.respuestaFase.listaFormulario = new Array<RespuestaFormulario>();
        this.itemsRepuesta.forEach((e,i)=>{
            this.respuestaFase.listaFormulario = this.respuestaFase.listaFormulario.concat(e);
        });
        
    }
    OnGuardarFase(outer_index: number,codigoPropuesta:number){
        if(this.index == outer_index){
            if(!this.postulacion.idPropuesta){
                this.postulacion.idPropuesta = codigoPropuesta;
                this.postulacion.idEvento = this.idEvento;
                this.postulacion.idFase = this.idFase;
                this.postulacion.enabled = true;
                this.postulacion.estado = EstadoPropuesta.PROPUESTA_BORRADOR;
            }
            let username = this.authService.usuario.username;
            this.respuestaFase.listaFormulario = new Array<RespuestaFormulario>();
            this.respuestaFase.postulacion = this.postulacion;
            this.itemsRepuesta.forEach((e,i)=>{
                this.respuestaFase.listaFormulario = this.respuestaFase.listaFormulario.concat(e);
            });
            this.propuestaService.guardarPostulacion(this.respuestaFase,username).subscribe(
                (response:Response)=>{
                    this.toastr.info(`Se guardo el formulario correctamente`, 'Aviso', { closeButton: true });
                }
            );
        }
       
    }
    OnAdjuntar(){}
    VerObservaciones(){}
} 


