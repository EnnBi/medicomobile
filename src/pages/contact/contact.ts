import { Component, NgZone } from '@angular/core';
import { NavController,App,LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AccountProvider } from '../../providers/account/account';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage'
import { OrdersProvider } from '../../providers/orders/orders';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage{

  public user:any;
  public role:string[]; 
  public imagePath:string = this.urlProvider.images;
 
  constructor(public navCtrl: NavController,public appCtrl:App,
              public accountProvider:AccountProvider,public orderProvider:OrdersProvider,private imagePicker: ImagePicker,
              private camera: Camera,public urlProvider:UrlProvider,public loadingCtrl:LoadingController,
              public zone:NgZone,public storage:Storage) {

  }
  ionViewDidLoad(){  
    this.accountProvider.getRolesOfUser().subscribe(res=>{
      console.log('ion view load before role')
      console.log(res);
        this.role =  res as Array<string>; 
    });
    console.log('ion view load after role')

    this.accountProvider.getUser().subscribe(res=>{
      this.user = res; 
    });
  }

  viewOrders(){ 
    this.orderProvider.viewOrders().subscribe(res=>{
      console.log('Response')
      console.log(res);
      this.navCtrl.push('OrdersPage');
    });
  }

  uploadPhoto(){
    console.log('------in photo------')
    const options = {
      quality: 80,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: 0,
      encodingType: 0
    }

    this.camera.getPicture(options).then((result)=>{
      let loading = this.loadingCtrl.create({
        content: 'Uploading Image...'
      });
      loading.present(); 
      console.log('---in camera---------')
      let image ='data:image/jpeg;base64,'+result;
      this.accountProvider.uploadPhoto(image).subscribe(res=>{
          this.user.image= res;
        loading.dismiss(()=>{
          console.log('in dismiss--')
          window.location.reload;
        });

      });
    }, (err) => {
      console.log('----err----------') 
      console.log(err);
    });
  }
 
  viewCart(){
    this.navCtrl.push('CartPage');
  }
  signout(){
    this.storage.remove('token');
    this.storage.remove('roles');
    this.appCtrl.getRootNav().setRoot(LoginPage);
 }

 viewDeliveryOrders(){
   this.navCtrl.push('DeliveryOrdersPage');
 }
   
}
  