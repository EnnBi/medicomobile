import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController } from 'ionic-angular';
import { CartProvider} from '../../providers/cart/cart';
/**
 * Generated class for the AddMedicineModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-medicine-modal',
  templateUrl: 'add-medicine-modal.html',
})
export class AddMedicineModalPage {
  medicinesList:any[]= [];
  secMedicinesList:any[]= [];
  
  name:String ;
  dosage:String;
  quantity:String;
  company:String;
  edit:boolean=false;
  editingItem;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl:ViewController,public toastCtrl:ToastController,
              private cartProvider:CartProvider) {
  }

  ionViewDidLoad() {
    this.edit = false;
    this.medicinesList = this.cartProvider.textMedicinesList;
  }
    

  addMedicine(){
    const data = {
      name:this.name,
      dosage:this.dosage,
      company:this.company
    }  
    console.log(data);
    var medWithQuantity = {
      'textMedicine' : data,
      'quantity' : this.quantity
    }
   this.medicinesList.push(medWithQuantity);
   const toast = this.toastCtrl.create({
    message: 'Medicine Added',
    duration: 1200,
    position: 'bottom'
  });  
  toast.present();
   this.name ='';
    this.dosage ='';
    this.quantity ='';
    this.company ='';
  }
  closeModal(){
    this.viewCtrl.dismiss(); 
   /*  for(let i=0;i<this.medicinesList.length;i++){
      if(this.medicinesList[i] != undefined){
        this.secMedicinesList.push(this.medicinesList[i]);
      }
    }
    this.medicinesList = [];
    this.medicinesList = this.secMedicinesList; */
    this.cartProvider.pushTextMedicineList(this.medicinesList);
  }

  
  removeItem(i){
    this.medicinesList.splice(i,1);
    const toast = this.toastCtrl.create({
      message: 'Medicine Deleted',
      duration: 1000,
      position: 'bottom'
    });
    toast.present();

  }

  editItem(i){
    this.edit = true;
    var data = this.medicinesList[i];
    this.name = data.textMedicine.name;
      this.dosage = data.textMedicine.dosage;
      this.quantity = data.quantity;
      this.company = data.textMedicine.company;
      this.editingItem=i;
  } 

  updateItem(){
    const data = {
      name:this.name,
      dosage:this.dosage,
      company:this.company
    } 
    var medWithQuantity = {
      'textMedicine' : data,
      'quantity' : this.quantity
    }
    this.medicinesList[this.editingItem]=medWithQuantity;
    console.log(this.medicinesList)
    const toast = this.toastCtrl.create({
      message: 'Medicine Updated',
      duration: 1200,
      position: 'bottom'
    });
    toast.present();
    this.edit = false;
    this.name ='';
    this.dosage ='';
    this.quantity ='';
    this.company ='';
  }

  
}
