import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductListModel, HomeService } from "@ngcommerce/core";
import { ProductDetailPage } from '../product-detail/product-detail';

/**
 * Generated class for the ListProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-product',
  templateUrl: 'list-product.html',
})
export class ListProductPage {
  products = {} as ProductListModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public homeService: HomeService
  ) {
  }

  ionViewDidLoad() {
    this.getProducts(this.navParams.data);
  }

  getProducts(category) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.homeService.seeAllProduct(category).then((data) => {
      this.products = data;
      loading.dismiss();
    }, (error) => {
      console.log(error);
      loading.dismiss();
    });
  }

  selectedProduct(item) {
    this.navCtrl.push(ProductDetailPage, item);
  }

}
