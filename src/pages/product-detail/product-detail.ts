import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ProductModel, ProductService, FavoriteService, CartService } from "@ngcommerce/core";
import { WritereviewPage } from '../writereview/writereview';
import { CartPage } from '../cart/cart';


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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public favoriteService: FavoriteService,
    public modalCtrl: ModalController,
    public cartService: CartService,
    public loadingCtrl: LoadingController
  ) {
    // this.product = this.navParams.data;
    this.init();
  }

  init() {
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
  reviewModal(e) {
    let reviewModal = this.modalCtrl.create(WritereviewPage);
    reviewModal.onDidDismiss(data => {
      if (data && data.topic !== '' && data.comment !== '' && data.rate !== '') {
        this.productService.reviewProduct(this.product._id, data)
          .then((resp) => {
            this.init();
          }, (err) => {
            console.error(err);
          });
      }
    });
    reviewModal.present();
  }

  addToCart(product) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.cartService.addToCart(product);
    this.navCtrl.push(CartPage);
    loading.dismiss();
  }
}
