import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Evento, Paginacion, FormularioCFP, Division, TipoEvento } from '../../../models';
import { EventoService } from 'src/app/services/evento.service';
import { Estado, Response } from '../../../models';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { Location } from '@angular/common';
import { esLocale } from 'ngx-bootstrap/locale';
import { PropuestaService } from 'src/app/services/propuesta.service';

@Component({
    selector: 'postular-evento',
    templateUrl: 'postular.template.html',
    styleUrls: ['postular.template.scss']
})

export class PostularEvento implements OnInit {
    private sub: any;
    public item: Evento = new Evento();
    public itemCodigo: number;
    public items: Array<Division>;
    public now_date: String = new Date().toISOString();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private _location: Location,
        private localeService: BsLocaleService,
        private authService: AeventAuthService,
        private service: EventoService,
        private servicePropuesta: PropuestaService){
        this.item.tipoEvento = new TipoEvento();
        console.log(this.now_date);
        this.sub = this.route.params.subscribe(params => {
            this.itemCodigo = +params['id'];
            this.obtenerEvento();
        });
        
        defineLocale('es', esLocale);
        this.localeService.use('es');
    }


    ngOnInit(): void {
        

    }

    async obtenerEvento(){
        await this.service.obtenerEvento(this.itemCodigo).subscribe(
            (response: Response)=>{
                this.item=response.resultado;
                //this.items = this.item.formulario.divisionList;
                console.log(this.item);
            }
        );
    }
    OnRegresar(){
        this._location.back();
    }

    async OnPostular(){
        let propuesta = null;
        let username = this.authService.usuario.username;
        let idEvento = this.item.idEvento;
        await this.servicePropuesta.obtenerPropuesta(username,idEvento).subscribe(
            (response:Response)=>{
               
                propuesta=response.resultado;
                if(propuesta){
                    let path:1;
                    this.router.navigate([`convocatoria/lista-ponencia/ver-postulacion/1/${idEvento}`]);
                }else{
                    if(!propuesta){
                        let path:0;
                        this.router.navigate([`convocatoria/lista-ponencia/ver-postulacion/0/${idEvento}`]);
                    }
                }
            }
        );
    }
}