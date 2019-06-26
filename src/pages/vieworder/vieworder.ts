import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';

/**
 * Generated class for the VieworderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vieworder',
  templateUrl: 'vieworder.html', 
})
export class VieworderPage {

  order:any;
  delivered:string=  'Delivered';
  cancelled:String = 'Cancelled'
  statusArray = ['Placed','Confirmed','Shipped','Delivered']
  viaDelivery:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public orderProvider:OrdersProvider,
              public toastCtrl:ToastController,public loadingCtrl: LoadingController,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    var id = this.navParams.get('id');
    this.viaDelivery = this.navParams.get('viaDelivery');
    console.log('viaDelivery   '+this.viaDelivery);
    this.orderProvider.getOrderOnId(id).subscribe(res=>{
      this.order = res;
    });
  } 

  getIndexOfStatus(){
    return this.statusArray.indexOf(this.order.status);
  }

  alertForCancel(status,id){
    let alert = this.alertCtrl.create({
      title: 'Cancel Order',
      message: 'Are you sure you want to cancel this order?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.changeOrderStatus(status,id);
          }
        }
      ]
    });
    alert.present();
  }

  changeOrderStatus(status,id){
    let loading = this.loadingCtrl.create({
      content: 'Updating Order...'
    });
    loading.present();
    this.orderProvider.changeOrderStatus(status,id).subscribe(data=>{
      loading.dismiss();
      console.log('response in change order status');
      this.order=data; 
      const toast = this.toastCtrl.create({
        message: 'Order updated successfully',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    },
    (err:any)=>{
      console.log("--here in error---"+err);
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Something went wrong.Please try again',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
    });
  }

}
