import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAddressModalPage } from './add-address-modal';

@NgModule({
  declarations: [
    AddAddressModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAddressModalPage),
  ],
})
export class AddAddressModalPageModule {}
