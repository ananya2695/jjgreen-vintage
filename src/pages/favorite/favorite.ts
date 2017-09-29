import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CorService, ProductListModel, ProductService, FavoriteListModel, FavoriteService } from "@ngcommerce/core";
import { Http } from '@angular/http';
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
  favorite = {} as FavoriteListModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public favoriteService: FavoriteService, public http: Http, public productService: ProductService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
    // this.getListFavorite();
    this.getListProduct();
  }
  // getListFavorite() {
  //   this.favoriteService.getFavoriteList().then((data) => {
  //     this.favorite = data;
  //     console.log(data);
  //   }, (error) => {
  //     console.error(error);
  //   });
  // }
   getListProduct() {
    this.productService.getProductList().then((data) => {
      this.favorite = data;
      console.log(data);
    }, (error) => {
      console.error(error);
    });
  }

}
