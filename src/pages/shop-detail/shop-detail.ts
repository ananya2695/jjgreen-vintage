import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ModalController} from 'ionic-angular';
import { ShopModel, ShopService } from "@ngcommerce/core";
import { WritereviewPage } from '../writereview/writereview';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public shopService:ShopService,public loadingCtrl:LoadingController,public modalCtrl:ModalController) {
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
  reviewModal(e) {
    let reviewModal = this.modalCtrl.create(WritereviewPage);
    reviewModal.onDidDismiss(data => {
      if (data && data.topic !== '' && data.comment !== '' && data.rate !== '') {
        let loading = this.loadingCtrl.create();
        loading.present();
        this.shopService.reviewShop(this.shop._id, data)
          .then((resp) => {
            loading.dismiss();
            this.init();
          }, (err) => {
            loading.dismiss();
            console.error(err);
          });
      }
    });
    reviewModal.present();
  }
}
