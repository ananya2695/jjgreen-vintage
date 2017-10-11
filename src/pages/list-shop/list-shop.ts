import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopListModel, ShopService } from "@ngcommerce/core";
import { ShopDetailPage } from '../shop-detail/shop-detail';

/**
 * Generated class for the ListShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-shop',
  templateUrl: 'list-shop.html',
})
export class ListShopPage {
  shop = {} as ShopListModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public shopService: ShopService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListShopPage');
    this.getShop();
  }
  getShop() {
    this.shopService.getShopList().then((data) => {
      this.shop = data;
      console.log(this.shop);
    }, (err) => {
      console.log(err);
    });
  }
  selected(e){
    this.navCtrl.push(ShopDetailPage,e);
  }
}
