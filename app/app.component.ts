import { Component , OnInit } from '@angular/core';
//http and rxjs
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/RX';

import {IWorldNew} from './world/IWorldNew';

//services
import {TopnewsWorldService} from './world/topnewsworld.service';

//carousel ng-2
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {CAROUSEL_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'my-app',
  templateUrl: 'app/world/worldNews.html',
  directives: [CAROUSEL_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers : [HTTP_PROVIDERS, TopnewsWorldService]
})
export class AppComponent implements OnInit{

topworldnewsCarousel : IWorldNew[];
topworldnews : IWorldNew[];
errorMessage : string;

constructor(private _topnewsworldService: TopnewsWorldService){}
 
    

ngOnInit(): void {
       
       this._topnewsworldService.getTopNews()
            .subscribe(
                topworldnews => {this.topworldnewsCarousel = topworldnews.slice(0,4);this.topworldnews = topworldnews.slice(4,8);},
                
                error => this.errorMessage = <any>error);
        
    }

    

 }


// import {Component} from '@angular/core';
// import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';

// @Component({
//   selector: 'my-app',
//   directives: [AlertComponent],
//   template: `<alert type="info">ng2-bootstrap hello world!</alert>`
// })
// export class AppComponent {
// }