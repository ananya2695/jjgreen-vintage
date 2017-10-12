import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import { ShopModel, ShopService } from "@ngcommerce/core";
import { WritereviewPage } from '../writereview/writereview';
import { LoadingProvider } from '../../providers/loading/loading';

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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public shopService:ShopService,
    public modalCtrl:ModalController,
    public loadingCtrl : LoadingProvider 
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopDetailPage');
    this.init();
  }
  init(){
    this.loadingCtrl.onLoading();
    this.shopService.getShopByID(this.navParams.data._id)
      .then(data => {
        this.shop = data;
        console.log(this.shop);
        this.loadingCtrl.dismiss();
      }, err => {
        this.loadingCtrl.dismiss();
      });
  }
  reviewModal(e) {
    let reviewModal = this.modalCtrl.create(WritereviewPage);
    reviewModal.onDidDismiss(data => {
      if (data && data.topic !== '' && data.comment !== '' && data.rate !== '') {
        
        this.loadingCtrl.onLoading();
        this.shopService.reviewShop(this.shop._id, data)
          .then((resp) => {
            this.loadingCtrl.dismiss();
            this.init();
          }, (err) => {
            this.loadingCtrl.dismiss();
            console.error(err);
          });
      }
    });
    reviewModal.present();
  }
}
