import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMedicineModalPage } from './add-medicine-modal';

@NgModule({
  declarations: [
    AddMedicineModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMedicineModalPage),
  ],
})
export class AddMedicineModalPageModule {}
