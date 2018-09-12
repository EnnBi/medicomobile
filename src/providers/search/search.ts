import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProvider } from '../../providers/url/url';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {

  constructor(public http: HttpClient,public urlProvider:UrlProvider,public storage:Storage) {
    console.log('Hello SearchProvider Provider');
  }

  search(url){
   
    return this.gettoken().flatMap(data => {
      const requestHeaders  = new HttpHeaders().append('X-AUTH-TOKEN', data);
      return this.http.get(url,{ headers: requestHeaders }).map((res:Response)=>{
        return res;
      });
    });
  }

  gettoken() {
    return Observable.fromPromise(this.storage.get('token'));
  }
}
