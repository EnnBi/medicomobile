import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';

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
              public accountProvider:AccountProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.accountProvider.viewOrders().subscribe(res=>{
      this.orders = res;
    });
  }

}
