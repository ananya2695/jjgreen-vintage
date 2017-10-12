import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CorService, ProductListModel, ProductService, FavoriteListModel, FavoriteService } from "@ngcommerce/core";
import { Http } from '@angular/http';
import { ProductDetailPage } from '../product-detail/product-detail';
import { LoadingProvider } from '../../providers/loading/loading';
/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {
  favorite: any = { items: [] };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public favoriteService: FavoriteService,
    public http: Http,
    public productService: ProductService,
    public loadingCtrl: LoadingProvider
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter FavoritePage');
    this.getListFavorite();
    //this.getListProduct();
  }
  getListFavorite() {
    this.loadingCtrl.onLoading();
    let favorites = this.favoriteService.getFavoriteList();
    console.log(favorites);
    this.favorite = favorites ? favorites : { items: [] };
    this.loadingCtrl.dismiss();
  }
  getListProduct() {
    this.loadingCtrl.onLoading();
    this.productService.getProductList().then((data) => {
      this.loadingCtrl.dismiss();
      this.favorite = data;
      console.log(data);
    }, (error) => {
      this.loadingCtrl.dismiss();
      console.error(error);
    });
  }

  selectedProduct(item) {
    this.navCtrl.push(ProductDetailPage, item);
  }

}
