import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { OrdersProvider } from '../../providers/orders/orders';
/**
 * Generated class for the DeliveryOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivery-orders',
  templateUrl: 'delivery-orders.html',
})
export class DeliveryOrdersPage {

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  @ViewChild('scroll') scroll: Content;

  SwipedTabsIndicator :any= null; 
  tabElementWidth_px :number= 33;
  tabs:any=[];
  public orders:any=[];
  public pendingOrders:any=[];
  public deliveredOrders:any=[];
  public cancelledOrders:any=[];

  hasMorePendingOrders:boolean = true;
  hasMoreDeliveredOrders:boolean = true;
  hasMoreCancelledOrders:boolean = true;

  pendingPage:number=0;
  deliveredPage:number=0;
  cancelledPage:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public accountProvider:AccountProvider,public ordersProvider:OrdersProvider ) {
    this.tabs=["Pending","Delivered","Cancelled"];
     

  }   
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryOrdersPage');
    this.getPendingOrders(null,false);
    this.getDeliveredOrders(null,false);
    this.getCancelledOrders(null,false);
  } 

 
  
  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
     //this.scroll.scrollTo(index*this.tabElementWidth_px,0,500);
    this.SwipedTabsSlider.slideTo(index, 500);
  } 

  updateIndicatorPosition() {
    //this.scroll.scrollTo(this.SwipedTabsSlider.getActiveIndex()*this.tabElementWidth_px,0,200);

      // this condition is to avoid passing to incorrect index
    if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
    {
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
    }

    }
 

  animateIndicator($event) {
    if(this.SwipedTabsIndicator)
         this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';

  }


  getPendingOrders($event,type:boolean){
    console.log('pendingOrders')
    console.log($event)
    console.log(type)
    console.log('------------------')
    if(type){
      this.pendingPage =0;
      this.pendingOrders = [];
    }     
    let shipped:string = 'Shipped';
    this.ordersProvider.getDeliveryOrders(shipped,this.pendingPage).subscribe(data=>{
        let dataArray:any= data;
        if(dataArray.length >0){
          this.pendingOrders = this.pendingOrders.concat(data);
          this.pendingPage++;
        }
        else{  
          this.pendingPage++;
          this.hasMorePendingOrders = false;
        }
        if($event != null){
            $event.complete(); 
        }
    }); 
  } 
  
  getDeliveredOrders($event,type:boolean){
    console.log('delivered')
    console.log($event)
    console.log(type)
    console.log('------------------')
    if(type){
      this.deliveredPage =0;
      this.deliveredOrders=[]
    }
    let delivered:string = 'Delivered';
    this.ordersProvider.getDeliveryOrders(delivered,this.deliveredPage).subscribe(data=>{
      let dataArray:any= data;
          this.deliveredOrders = this.deliveredOrders.concat(data);
          this.deliveredPage++;
        if(dataArray.length<10)
            this.hasMoreDeliveredOrders = false;
        
        if($event != null){
            $event.complete(); 
        }
    }); 
  }

  getCancelledOrders($event,type:boolean){
    console.log('cancelled')
    console.log($event)
    console.log(type)
    console.log('------------------')
    let cancelled:string = 'Cancelled';
    if(type){
      this.cancelledPage =0;
      this.cancelledOrders=[];
    }
    this.ordersProvider.getDeliveryOrders(cancelled,this.cancelledPage).subscribe(data=>{
      let dataArray:any= data;
        if(dataArray.length >0){
          this.cancelledOrders = this.cancelledOrders.concat(data);
          this.cancelledPage++;
        }
        else{  
          this.cancelledPage++;
          this.hasMoreCancelledOrders = false;
        }
        if($event != null){
            $event.complete(); 
        }
    }); 

  } 
  
  viewOrder(id){ 
    console.log('----'+id)
    this.navCtrl.push('VieworderPage',{'id':id,'viaDelivery':true});
  } 
} 
