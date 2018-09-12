import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,ModalController, Alert } from 'ionic-angular';
import { Http,Headers, RequestOptions  } from '@angular/http';
import { CartProvider } from '../../providers/cart/cart';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */  

interface address {
  name: string;
  address: string;
  landmark: string;
  contact: number;
}


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html', 
})
export class CartPage { 

  textMedicineList:any[]=[];
  medicinesList:any[] = [];
  address:address;
  prescriptionPhoto:String;
  total:Number=0;
  responseData:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http:Http,private camera: Camera,public cartProvider:CartProvider,
              public modalCtrl:ModalController,public loadingCtrl:LoadingController) {
  }
 
  ionViewDidLoad() {
    this.textMedicineList = this.cartProvider.textMedicinesList;
    this.medicinesList = this.cartProvider.medicinesList;
    this.getTotal(); 
    console.log('adress-----'+this.address);
  }
 
  increment(i,listType:boolean){ 
    if(listType){
      this.medicinesList[i].quantity = this.medicinesList[i].quantity+1;
      this.getTotal();
    }
    else
      this.textMedicineList[i].quantity = Number(this.textMedicineList[i].quantity)+1;
  }

  decrement(i,listType:boolean){
    if(listType){
      this.medicinesList[i].quantity = this.medicinesList[i].quantity-1;
      this.getTotal();
    }
    else
      this.textMedicineList[i].quantity = this.textMedicineList[i].quantity-1;
  }
  

  delete(i,listType:boolean){
    if(listType){
      this.medicinesList.splice(i,1);
      this.getTotal();
    }
    else
      this.textMedicineList.splice(i,1); 
  }

  getTotal(){ 
    var sum:number=0;
    this.medicinesList.forEach(function(item, index){
      console.log(item.quantity+"--------"+item.medicine.price);
      console.log(item.quantity*item.medicine.price)
          sum+=(item.quantity * item.medicine.price);
    }); 
    this.total = sum;
    console.log('-------'+this.total);
  } 
  
  readonly options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
   
  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64: 
      let loading = this.loadingCtrl.create({
        content: 'Uploading Prescription Photo...'
      });
      loading.present(); 
      this.prescriptionPhoto  ='data:image/jpeg;base64,'+imageData;
      loading.dismiss(); 
         }, (err) => { 
      // Handle error   y
     }); 
  }

  showAddressModal(){
    const modal = this.modalCtrl.create('AddAddressModalPage');
    modal.present();
    modal.onDidDismiss(()=>{
      this.address = this.cartProvider.address;
    });
  }

  editAddressModal(){
    const modal = this.modalCtrl.create('AddAddressModalPage');
    modal.present();
    modal.onDidDismiss(()=>{
      this.address = this.cartProvider.address;
    });
  }

  placeOrder(){
    let loading = this.loadingCtrl.create({
      content: 'Placing Order...'
    });
    loading.present(); 
    console.log('--in order-- at cart page---everything good--');
    this.cartProvider.prescriptionPhoto = this.prescriptionPhoto;
    this.cartProvider.postCartItems().subscribe(data => { 
      loading.dismiss();
      this.navCtrl.push('OrderSuccessPage');
    }); 
  }

  
  gotoHome(){
    this.navCtrl.setRoot(TabsPage);
  }
}         