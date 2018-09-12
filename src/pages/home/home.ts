import { Component } from '@angular/core';
import { NavController,ModalController,ToastController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { AddMedicineModalPage } from './add-medicine-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {

   medicinesList:any[]= [];
   base64Image:String;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController,
              private camera: Camera,public toastCtrl:ToastController) {

  }
  readonly options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  ionViewDidLoad() {
  }

  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }

  presentModal() {
    const modal = this.modalCtrl.create('AddMedicineModalPage');
    modal.present();
    modal.onDidDismiss((data)=>{
      if(data != undefined)
        this.medicinesList.push(data);
    });

  }

  removeItem(i){
    this.medicinesList[i] = undefined;
    const toast = this.toastCtrl.create({
      message: 'Item deleted',
      duration: 1000,
      position: 'bottom'
    });
    toast.present();

  }

  editItem(i){
    var mydata = this.medicinesList[i];
    const modal = this.modalCtrl.create('AddMedicineModalPage',{data:mydata});
    modal.present();
    modal.onDidDismiss((data)=>{
      console.log((data == undefined));
      if(data != undefined)
        this.medicinesList[i]=data;
    });
  }
}
