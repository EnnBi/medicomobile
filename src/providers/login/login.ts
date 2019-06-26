import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProvider } from '../../providers/url/url';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient,public urlProvider:UrlProvider) {
    console.log('Hello LoginProvider Provider');
  }

  login(user):Observable<any>{
    const url = this.urlProvider.login;
    return this.http.post(url,user).map((res:Response)=>{
      console.log('-------in td rpovof');
      console.log(res)
      return res;
    });
  }

  signup(user):Observable<any>{
    const url = this.urlProvider.register;
    return this.http.post(url,user).map((res:Response)=>{
      return res;
    });
  }
}
