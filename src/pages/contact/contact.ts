import { Component, NgZone } from '@angular/core';
import { NavController,App,LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AccountProvider } from '../../providers/account/account';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { UrlProvider } from '../../providers/url/url';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage{

  public user:any;
  public imagePath:string = this.urlProvider.images;
 
  constructor(public navCtrl: NavController,public appCtrl:App,
              public accountProvider:AccountProvider,private imagePicker: ImagePicker,
              private camera: Camera,public urlProvider:UrlProvider,public loadingCtrl:LoadingController,
              public zone:NgZone) {

  }
  ionViewDidLoad(){ 

    this.accountProvider.getUser().subscribe(res=>{
      this.user = res;
    });
  }

  viewOrders(){ 
    this.accountProvider.viewOrders().subscribe(res=>{
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
    this.appCtrl.getRootNav().setRoot(LoginPage);
 }

}
  