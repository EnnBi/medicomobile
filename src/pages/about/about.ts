import { Component,ViewChild,Input } from '@angular/core';
import { NavController,ModalController,PopoverController, ToastController, LoadingController,PopoverOptions,Platform } from 'ionic-angular';
import { SearchProvider } from "../../providers/search/search";
import { CartProvider } from "../../providers/cart/cart";
import {UrlProvider } from '../../providers/url/url';
import { Http } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';

import "rxjs/add/operator/map";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('searchbar') searchbar;
  public isSearch=false;
  searchMedicinesList:any[]= [];
  responseData:any;
   page:number = 0;
   search:String;
   querySearch:boolean = false;
   cartSize:Number;
   quantity=1;
   opacity:boolean=false;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController,
              private http:Http,private searchProvider:SearchProvider,
              private cartProvider:CartProvider,private popoverCtrl:PopoverController,
              private urlProvider:UrlProvider,public toastCtrl:ToastController,public loadingCtrl: LoadingController,
              private platform: Platform,private splashScreen: SplashScreen) {

  }

  searchBar(){
    this.isSearch=!this.isSearch;
    this.page=0;
    setTimeout(() => { 
      this.searchbar.setFocus();
    },150);
  }  

  openCart(){
    this.navCtrl.push('CartPage');
  }

  onCancel(){
    this.isSearch=!this.isSearch
  }  
 
  doRefresh(refresher){
    console.log('in refersher---------')
    this.searchMedicineOnQuery(refresher);
    
  }
  presentModal() {
    const modal = this.modalCtrl.create('AddMedicineModalPage');
    modal.present(); 
    modal.onDidDismiss(()=>{
      this.cartSize = this.cartProvider.textMedicinesList.length+this.cartProvider.medicinesList.length;
    });  

  }

  presentQuantityModal(id){
    var options:PopoverOptions ={
      cssClass :'popovercss',
    }
    const quantityModal = this.popoverCtrl.create('QuantityModalPage',{id : id},options);
    let ev = { 
      target : {
        getBoundingClientRect : () => {
          return {
            top: '140'
          };
        }
      }
    }
    quantityModal.present({ev});
    this.opacity = true;
    quantityModal.onDidDismiss(()=>{
      this.opacity=false;
      this.cartSize = this.cartProvider.textMedicinesList.length+this.cartProvider.medicinesList.length;
    });
   
  }

   ionViewDidLoad(){ 
    console.log('ionViewDidLoad AboutPage');
    this.platform.ready().then(()=>{
      this.splashScreen.hide();
    });
    let loading = this.loadingCtrl.create({
      content: 'Loading Medicines...'
    });
    loading.present();
    this.page = this.page+1;
    var url = this.urlProvider.search+''+this.page;  
    this.searchProvider.search(url).subscribe(data=>{
        this.responseData=data;
        this.searchMedicinesList=this.responseData;
        loading.dismiss();
      },
      (err:any)=>{                                                                              
          loading.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Something went wrong.Please try again',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
    });
  }

  getMoreOnPageLoad($event){
    this.page = this.page+1;
    var url =this.urlProvider.search+''+this.page;
    this.searchProvider.search(url).subscribe(data => { 
      this.responseData=data;
      this.searchMedicinesList = this.searchMedicinesList.concat(this.responseData);
      $event.complete();
    });   
  }


  getMoreOnSearchQuery($event){
    this.page = this.page+1;
    var url = this.urlProvider.search+''+this.search+'/'+this.page;
    this.searchProvider.search(url).subscribe(data => { 
      this.responseData=data;
      this.searchMedicinesList = this.searchMedicinesList.concat(this.responseData);
      $event.complete();
    });
    
     
  }


  searchMedicineOnQuery(refresher){
    console.log('i serch mediccine query')
    this.page = 1;
    this.querySearch=true;
    var url;
    console.log('search----'+this.search);
    if(this.search != '' && this.search != undefined && this.search != null)
       url = this.urlProvider.search+''+this.search+'/'+this.page;
     else{
       url = this.urlProvider.search+''+this.page;
      this.querySearch=false;
     }
    this.searchMedicinesList=[];
    this.searchProvider.search(url).subscribe(data => { 
      this.responseData=data;
      this.searchMedicinesList = this.searchMedicinesList.concat(this.responseData);
     if(refresher != undefined)
        refresher.complete();
    }); 
    
  }

}
