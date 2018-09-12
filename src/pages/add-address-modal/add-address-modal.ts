import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';

/**
 * Generated class for the AddAddressModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-address-modal',
  templateUrl: 'add-address-modal.html',
})
export class AddAddressModalPage {

  name:String ;
  address:String;
  landmark:String;
  contact:number;
  edit:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cartProvider:CartProvider,public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log(this.cartProvider.address+"--------in ionvreload")
    if(this.cartProvider.address != null){
      console.log('it shudn;t be here-------')
      this.name = this.cartProvider.address.name;
      this.address = this.cartProvider.address.address;
      this.landmark = this.cartProvider.address.landmark;
      this.contact = this.cartProvider.address.contact;
      this.edit = true;
    }
  }

  addAddress(){
    var address = {
      name:this.name,
      address:this.address,
      landmark:this.landmark,
      contact:this.contact
    }
    this.cartProvider.address = address;
    this.name='';
    this.address='';
    this.landmark='';
    this.contact;
    this.viewCtrl.dismiss(); 
  }

  close(){
    this.name='';
    this.address='';
    this.landmark='';
    this.contact;
    this.viewCtrl.dismiss(); 
  }

}
