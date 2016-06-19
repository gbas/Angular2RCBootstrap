import {Injectable} from '@angular/core';
import {Http , Response,URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IWorldNew} from './IWorldNew';


@Injectable()
export /**
 * TopnewsWorldService
 */
class TopnewsWorldService {
    constructor(private _http: Http) {
    
    }
   
    //private topWorldNewsUrl= 'app/world/topnewsworld.json';
    private topWorldNewsUrl="https://api.nytimes.com/svc/topstories/v2/home.json";

    private  extractData(res:Response) {
         let results=res.json().results;

         let ret= results.
            map(function(result){
                
                return result.multimedia.
                filter(function(media) {
                    return media.width >= 250;
                }).
                map(function(media) {
                
                    return {url: result.url,title:result.title,abstract:result.abstract,imageUrl:media.url};
                });
            });

         return [].concat.apply([],ret);
        
        
    }
   

    getTopNews() : Observable<IWorldNew[]> {
        let params = new URLSearchParams();
        params.set('api-key', "f2507b0c22784e4f82b81f03bc1c2270")
        
        return this._http.get(this.topWorldNewsUrl,{search:params})
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

