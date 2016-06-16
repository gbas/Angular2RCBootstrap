import { Component,OnInit } from '@angular/core';

import { Router } from '@angular/router-deprecated';

//http and rxjs
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/RX';

import * as _ from 'lodash';

import {IMovie} from './IMovie';

//service
import {MoviesService} from './movies.service';


import { PAGINATION_DIRECTIVES,DROPDOWN_DIRECTIVES  } from 'ng2-bootstrap/ng2-bootstrap';

@Component ({

    templateUrl:'app/movies/movies.html',
    directives: [PAGINATION_DIRECTIVES,DROPDOWN_DIRECTIVES ],
    providers : [HTTP_PROVIDERS,MoviesService]
  

})

export class MoviesComponent implements OnInit{

    movies: IMovie[];
    moviesToShow: IMovie[];
    errorMessage : string;
    public totalItems:number;
    public currentPage:number = 1;
    public itemsPerPage:number =4;

    public status:{isopen:boolean} = {isopen: false};
    public items:Array<string> = ['Newest First',
    'Oldest First', 'A-Z','Z-A'];


    constructor(private _moviesService: MoviesService){}

    ngOnInit(): void {
       
       this._moviesService.getMovies()
            .subscribe(
               
                movies=>{this.movies=movies;this.totalItems=this.movies.length;this.moviesToShow=this.movies.slice(0,this.itemsPerPage);},
                
                error => this.errorMessage = <any>error);

      
        
    }

    public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
    
    }

    public order(orderparameter:number)
    {
        let sortedMovies:IMovie[];
        //newest first
        switch(orderparameter)
        {
            //newest first
            case 1:
            sortedMovies=_.orderBy(this.movies,['publicationDate'],['desc']);
            break;
            //oldest first
            case 2:
            sortedMovies=_.orderBy(this.movies,['publicationDate'],['asc']);
            break;
            case 3:
            sortedMovies=_.sortBy(this.movies,'title');            
            break;
            case 4:
            sortedMovies=_.orderBy(this.movies,['title'],['desc']);
            break;
        }
       
       
        this.movies=sortedMovies;
        this.currentPage=1;
        this.moviesToShow=this.movies.slice(0,this.itemsPerPage);
        
      
    }

     public pageChanged(event:any):void {
         
        let index=(event.page-1) * this.itemsPerPage;
        this.moviesToShow=this.movies.slice(index,index+this.itemsPerPage);
      
  };
}

