import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from './app.settings';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private titleService: Title,private router: Router) {
    this.titleService.setTitle( AppSettings.APP_TITLE );
  }

  ngOnInit() {
    
      this.router.navigate(['/login']);
    
  }
}

