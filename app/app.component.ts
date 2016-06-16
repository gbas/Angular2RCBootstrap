import { Component , OnInit } from '@angular/core';

import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import {IWorldNew} from './world/IWorldNew';

//components 
import {WorldNewsComponent} from './world/worldnews.component';
import {MoviesComponent} from './movies/movies.component';


@Component({
  selector: 'my-app',
  templateUrl: './app/startpage.html',
  directives: [ ROUTER_DIRECTIVES],
  providers : [ROUTER_PROVIDERS]
})

@RouteConfig([
  {
    path: '/worldnews',
    name: 'WorldNews',
    component: WorldNewsComponent,
    useAsDefault: true
  },
  {
    path: '/movies',
    name: 'Movies',
    component: MoviesComponent
  }
])


export class AppComponent {




}