import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProvider } from '../../providers/url/url';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI
*/
@Injectable()
export class CartProvider {

  textMedicinesList:any=[];
  medicinesList:any=[];
  address:any;
  prescriptionPhoto:String;


  constructor(public http: HttpClient,public urlProvider:UrlProvider,public storage:Storage) {
    console.log('Hello CartProvider Provider');
  }


  pushTextMedicineList(textMedicineList){
    this.textMedicinesList = textMedicineList;
  }

   addMedicinetoCart(id,quantity):Observable<any>{
    var medicine ;
    const url = this.urlProvider.medicineOnId+id;
    return this.gettoken().flatMap(data=>{
      var requestHeaders = new HttpHeaders().append('X-AUTH-TOKEN',data);
      return this.http.get(url,{headers: requestHeaders}).map((res:Response)=>{
        medicine=res;
        console.log(medicine)
        let cartItem = {
            'medicine':medicine,
            'quantity':quantity 
          }
        this.medicinesList.push(cartItem);

        }); 
    });


  } 

  postCartItems(){
   return this.gettoken().flatMap(data => {
      let url = this.urlProvider.postOrder;
      const order = this.createOrder();
      const requestHeaders  = new HttpHeaders().append('X-AUTH-TOKEN', data);
      return this.http.post(url,order,{ headers: requestHeaders }).map((res:Response)=>{
        return res;
      });
    });
  }
 
   
  gettoken() {
    return Observable.fromPromise(this.storage.get('token'));
  }
  
  createOrder(){
    let order = {
      'cartItems':this.medicinesList.concat(this.textMedicinesList),
      'prescriptionPhoto':this.prescriptionPhoto,
      'address':this.address
    }
    return order;
  }
}
