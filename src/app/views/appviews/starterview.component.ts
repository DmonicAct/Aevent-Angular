import { Component, OnDestroy, OnInit, } from '@angular/core';

@Component({
  selector: 'starter',
  templateUrl: 'starter.template.html'
})
export class StarterViewComponent implements OnDestroy, OnInit  {

public nav:any;

public constructor() {
  this.nav = document.querySelector('nav.navbar');
}

public ngOnInit():any {
 /*  this.nav.className += " white-bg"; */
}


public ngOnDestroy():any {
/*   debugger;
  this.nav.classList.remove("white-bg"); */
}

}
