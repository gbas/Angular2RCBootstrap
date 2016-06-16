import {Injectable} from '@angular/core';
import {Http , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IMovie} from './IMovie';


@Injectable()
export /**
 * MoviesService
 */
class MoviesService {
    constructor(private _http: Http) {
    
    }
   
    private moviesUrl= 'app/movies/movies.json';

    private  extractData(res:Response) :IMovie[] {
           let results=res.json().results;

           let ret= results.
            map(function(result){
                  
                   return {url: result.link.url,title:result.display_title,abstract:result.summary_short,
                       imageUrl:(result.multimedia!=null ? result.multimedia.src : '/app/movies/no image.jpg'),
                       publicationDate:(Date.parse(result.publication_date)), 
                       mpaaRating:(result.mpaa_rating!=""? result.mpaa_rating : 'G')};
                                       
            });
           
           var a=ret;
           return [].concat.apply([],ret);
        
        
        
    }
   

    getMovies() : Observable<IMovie[]> {
        return this._http.get(this.moviesUrl)
        .map(this.extractData)
            // .do(data => {
               
            //    console.log( JSON.stringify(data))}
            // )
            .catch(this.handleError);


    }
   
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}

