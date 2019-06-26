import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

/*
  Generated class for the OrdersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrdersProvider {

  constructor(public http: HttpClient,public urlProvider:UrlProvider,public storage:Storage) {
    console.log('Hello OrdersProvider Provider');
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

  getOrderOnId(id){
    return this.gettoken().flatMap(data => {
       let url = this.urlProvider.order+'/'+id;
       const requestHeaders  = new HttpHeaders().append('X-AUTH-TOKEN', data);
       return this.http.get(url,{ headers: requestHeaders }).map((res:Response)=>{
         return res;
       });
     });
   }
  
    
   gettoken() {
     return Observable.fromPromise(this.storage.get('token'));
   }

   getDeliveryOrders(status:string,page:number){
    return this.gettoken().flatMap(data => {
      let url = this.urlProvider.getOrdersOfDelivery+'?status='+status+'&page='+page;
      const requestHeaders  = new HttpHeaders().append('X-AUTH-TOKEN', data);
      return this.http.get(url,{ headers: requestHeaders }).map((res:Response)=>{
        return res;
      });
    });
   }
   
   changeOrderStatus(status:string,id:string){
    return this.gettoken().flatMap(data => {
      let url = this.urlProvider.changeOrderStatus+'?status='+status+'&id='+id;
      const requestHeaders  = new HttpHeaders().append('X-AUTH-TOKEN', data);

      return this.http.get(url,{ headers: requestHeaders }).map((res:Response)=>{
        return res;
      }); 
    });
   }
}
