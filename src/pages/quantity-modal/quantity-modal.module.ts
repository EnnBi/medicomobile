import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuantityModalPage } from './quantity-modal';

@NgModule({
  declarations: [
    QuantityModalPage,
  ],
  imports: [
    IonicPageModule.forChild(QuantityModalPage),
  ],
})
export class QuantityModalPageModule {}
