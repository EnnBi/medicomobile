import { Component,ViewChild,Input } from '@angular/core';
import { NavController,ModalController,PopoverController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { SearchProvider } from "../../providers/search/search";
import { CartProvider } from "../../providers/cart/cart";
import {UrlProvider } from '../../providers/url/url';
import { Http } from '@angular/http';
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
              private urlProvider:UrlProvider) {

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
 
  presentModal() {
    const modal = this.modalCtrl.create('AddMedicineModalPage');
    modal.present();
    modal.onDidDismiss(()=>{
      this.cartSize = this.cartProvider.textMedicinesList.length+this.cartProvider.medicinesList.length;
    });  

  }

  presentQuantityModal(id){
    const quantityModal = this.popoverCtrl.create('QuantityModalPage',{id : id});
    quantityModal.present();
    this.opacity = true;
    quantityModal.onDidDismiss(()=>{
      this.opacity=false;
      this.cartSize = this.cartProvider.textMedicinesList.length+this.cartProvider.medicinesList.length;
    });
  }

   ionViewDidLoad(){ 
    this.page = this.page+1;
    var url = this.urlProvider.search+''+this.page;  
    this.searchProvider.search(url).subscribe(data=>
      {
        this.responseData=data;
        for(let i=0; i<this.responseData.length; i++) {
          this.searchMedicinesList.push(this.responseData[i]);
        }
      }
    );
  }

  getMoreOnPageLoad($event){
    this.page = this.page+1;
    var url =this.urlProvider.search+''+this.page;
    this.searchProvider.search(url).subscribe(data => { 
      this.responseData=data;
      for(let i=0; i<this.responseData.length; i++) {
        this.searchMedicinesList.push(this.responseData[i]);
      } 
      $event.complete();
    });   
  }


  getMoreOnSearchQuery($event){
    this.page = this.page+1;
    var url = this.urlProvider.search+''+this.search+'/'+this.page;
    this.searchProvider.search(url).subscribe(data => { 
      this.responseData=data;
      for(let i=0; i<this.responseData.length; i++) {
        this.searchMedicinesList.push(this.responseData[i]);
      } 
      $event.complete();
    });
    
     
  }


  searchMedicineOnQuery(){
    this.page = 1;
    this.querySearch=true;
    var url;
    if(this.search != '')
       url = this.urlProvider.search+''+this.search+'/'+this.page;
     else{
       url = this.urlProvider.search+''+this.page;
      this.querySearch=false;
     }
    this.searchMedicinesList=[];
    this.searchProvider.search(url).subscribe(data => { 
      this.responseData=data;
      for(let i=0; i<this.responseData.length; i++) {
        this.searchMedicinesList.push(this.responseData[i]);
      } 
    }); 
  }

}
