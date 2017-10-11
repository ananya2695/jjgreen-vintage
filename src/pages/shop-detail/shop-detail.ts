import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { ShopModel, ShopService } from "@ngcommerce/core";

/**
 * Generated class for the ShopDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-detail',
  templateUrl: 'shop-detail.html',
})
export class ShopDetailPage {
  shop = {} as ShopModel;
  constructor(public navCtrl: NavController, public navParams: NavParams,public shopService:ShopService,public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopDetailPage');
    this.init();
  }
  init(){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.shopService.getShopByID(this.navParams.data._id)
      .then(data => {
        this.shop = data;
        console.log(this.shop);
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
  }
}
