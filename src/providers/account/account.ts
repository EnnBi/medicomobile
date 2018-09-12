import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { UrlProvider } from '../../providers/url/url';
/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider { 
 
  constructor(public http: HttpClient,public storage:Storage,public urlProvider:UrlProvider) {
    console.log('Hello AccountProvider Provider');
  } 
 

getUser(){
   let url = this.urlProvider.getUser;
    return this.gettoken().flatMap(data => {
      const requestHeaders  = new HttpHeaders().append('X-AUTH-TOKEN', data);
      return this.http.get(url,{ headers: requestHeaders }).map((res:Response)=>{
        return res;
      }); 
    });
  }

  viewOrders(){  
    let url = this.urlProvider.getUserOrders;
    return this.gettoken().flatMap(data => {
      const requestHeaders  = new HttpHeaders().append('X-AUTH-TOKEN', data);
      return this.http.get(url,{ headers: requestHeaders }).map((res:Response)=>{
        return res;
      }); 
    }); 
  }

  uploadPhoto(image){
    let url = this.urlProvider.uploadPhoto;
    return this.gettoken().flatMap(data=>{
      const requestHeaders  = new HttpHeaders().append('X-AUTH-TOKEN', data);
      return this.http.post(url,image,{ headers: requestHeaders }).map(res=>{
        console.log('--response in provider---');
        console.log(res)
        return res;
      });
    }); 
  }


  gettoken() {
    return Observable.fromPromise(this.storage.get('token'));
  }
}
