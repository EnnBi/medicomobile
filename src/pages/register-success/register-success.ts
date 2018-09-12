import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the RegisterSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-success',
  templateUrl: 'register-success.html',
})
export class RegisterSuccessPage {

  email:String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterSuccessPage');
    this.email = this.navParams.get('email');
    console.log(this.email);
  }

  closePopover(){
    this.viewCtrl.dismiss();
  }
}
