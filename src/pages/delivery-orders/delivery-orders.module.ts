import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryOrdersPage } from './delivery-orders';

@NgModule({
  declarations: [
    DeliveryOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryOrdersPage),
  ],
})
export class DeliveryOrdersPageModule {}
