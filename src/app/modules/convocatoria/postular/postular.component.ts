import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Evento, Paginacion, FormularioCFP, Division } from '../../../models';
import { EventoService } from 'src/app/services/evento.service';
import { Estado, Response } from '../../../models';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';


@Component({
    selector: 'postular-evento',
    templateUrl: 'postular.template.html',
    styleUrls: ['postular.template.scss']
})

export class PostularEvento implements OnInit {
    private sub: any;
    public item: Evento;
    public itemCodigo: number;
    public items: Array<Division>;
    constructor(private route: ActivatedRoute,
        private service: EventoService){
        this.item = new Evento();
        this.item.formulario = new FormularioCFP();
        this.item.idEvento = null;
        this.sub = this.route.params.subscribe(params => {
            this.itemCodigo = +params['id'];
            this.obtenerEvento();
        });
    }


    ngOnInit(): void {
        

    }

    obtenerEvento(){
        this.service.obtenerEvento(this.itemCodigo).subscribe(
            (response: Response)=>{
                this.item=response.resultado;
                this.items = this.item.formulario.divisionList;
                console.log(this.items);
            }
        );
    }

}