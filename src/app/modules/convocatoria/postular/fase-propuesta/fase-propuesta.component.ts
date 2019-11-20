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
    OnEnviar(){
        this.respuestaFase.listaFormulario = new Array<RespuestaFormulario>();
        this.itemsRepuesta.forEach((e,i)=>{
            this.respuestaFase.listaFormulario = this.respuestaFase.listaFormulario.concat(e);
        });
        
    }
    OnGuardarFase(outer_index: number,codigoPropuesta:number){
        if(this.index == outer_index){
           /*  console.log("its me ..." + this.index); */
            if(!this.postulacion.idPropuesta){
                this.postulacion.idPropuesta = codigoPropuesta;
                this.postulacion.idEvento = this.idEvento;
                this.postulacion.idFase = this.idFase;
                this.postulacion.enabled = true;
                this.postulacion.estado = EstadoPropuesta.PROPUESTA_BORRADOR;
                //this.postulacion.idUsuario = this.authService.persona.idUsuario;
            }
            let username = this.authService.usuario.username;
            console.log("persona:", this.authService.persona);
            console.log("usuario:", this.authService.usuario);
            this.respuestaFase.listaFormulario = new Array<RespuestaFormulario>();
            this.respuestaFase.postulacion = this.postulacion;
            this.itemsRepuesta.forEach((e,i)=>{
                this.respuestaFase.listaFormulario = this.respuestaFase.listaFormulario.concat(e);
            });
            console.log(this.respuestaFase);
    
            this.propuestaService.guardarPostulacion(this.respuestaFase,username).subscribe(
                (response:Response)=>{
                    console.log(response);
                    this.toastr.info(`Se guardo el formulario correctamente`, 'Aviso', { closeButton: true });
                }
            );
        }
       
    }
} 


