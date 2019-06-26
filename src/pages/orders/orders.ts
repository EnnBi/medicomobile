import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

 public orders:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public orderProvider:OrdersProvider,public toastCtrl:ToastController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.orderProvider.viewOrders().subscribe(res=>{
      this.orders = res;
    }); 
  }

  viewOrder(id){
    console.log('----'+id)
    this.navCtrl.push('VieworderPage',{'id':id,'viaDelivery':false});
  }  

  
}
