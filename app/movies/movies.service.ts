import {Injectable} from '@angular/core';
import {Http , Response,URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IMovie} from './IMovie';


@Injectable()
export /**
 * MoviesService
 */
class MoviesService {
    constructor(private _http: Http) {
    
    }
   
    

    //private moviesUrl= 'app/movies/movies.json';
    private moviesUrl='https://api.nytimes.com/svc/movies/v2/reviews/search.json';


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
        let params = new URLSearchParams();
        params.set('api-key', "f2507b0c22784e4f82b81f03bc1c2270")
        return this._http.get(this.moviesUrl,{search :params})
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

