import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()  
export class UrlProvider { 

  
  //public IP:string = 'http://192.168.43.39:8080/api';
  public IP:string = 'http://192.168.2.7:8080/api';
  public search:string=this.IP+'/search/';
  public login:string=this.IP+'/login';
  public register:string=this.IP+'/register';
  public medicineOnId:string=this.IP+'/medicine/';
  public postOrder:string=this.IP+'/order';
  public getUser:string=this.IP+'/user';
  public getUserOrders:string=this.IP+'/user/orders';  
  public uploadPhoto:string=this.IP+'/user/photo';
  public images:string = this.IP+'/images/';
  constructor(public http: HttpClient) {
    console.log('Hello UrlProvider Provider');
  }  
   
 
}
