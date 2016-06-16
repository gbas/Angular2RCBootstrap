import { Component, OnInit } from '@angular/core';
//http and rxjs
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/RX';
import {IWorldNew} from './IWorldNew';



//services
import {TopnewsWorldService} from './topnewsworld.service';

//carousel ng-2
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {CAROUSEL_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
//routing
import { Router } from '@angular/router-deprecated';

@Component({
  
   templateUrl: 'app/world/worldnews.html',
   directives: [CAROUSEL_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
   providers : [HTTP_PROVIDERS, TopnewsWorldService]
})

export class WorldNewsComponent implements OnInit {

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