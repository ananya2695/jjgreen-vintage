import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListShopPage } from './list-shop';

@NgModule({
  declarations: [
    ListShopPage,
  ],
  imports: [
    IonicPageModule.forChild(ListShopPage),
  ],
})
export class ListShopPageModule {}
