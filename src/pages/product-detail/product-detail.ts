import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductModel, ProductService, FavoriteService } from "@ngcommerce/core";


/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  product = {} as ProductModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public productService: ProductService, public favoriteService: FavoriteService) {
    // this.product = this.navParams.data;
    this.productService.getProductByID(this.navParams.data._id)
      .then(data => {
        this.product = data;
        console.log(this.product);

      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }
  selectedFavorite(product) {
    product.image = product.images[0];
    this.favoriteService.addFavorite(product);
  }
}
