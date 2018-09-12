import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';

/**
 * Generated class for the QuantityModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quantity-modal',
  templateUrl: 'quantity-modal.html',
})
export class QuantityModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private cartProvider:CartProvider,public viewCtrl:ViewController) {
  }

  quantity:number;
  medicineId:number;
  ionViewDidLoad() {
    this.quantity=1; 
    this.medicineId=this.navParams.get('id');
  }

  increment(){
    this.quantity= this.quantity+1;
  }
  decrement(){
    if(this.quantity>0)
      this.quantity= this.quantity-1;
  } 

  addToCart(){
    this.cartProvider.addMedicinetoCart(this.medicineId,this.quantity).subscribe(res=>{
      this.viewCtrl.dismiss();
    });
    
  } 
}
