import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductModel, ProductService, FavoriteService, CartService } from "@ngcommerce/core";
import { WritereviewPage } from '../writereview/writereview';
import { CartPage } from '../cart/cart';
import { LoginPage } from '../login/login';
import { LoadingProvider } from '../../providers/loading/loading';


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
  favoriteListModel: any = { items: [] };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public favoriteService: FavoriteService,
    public modalCtrl: ModalController,
    public cartService: CartService,
    public loadingCtrl: LoadingProvider
  ) {
    // this.product = this.navParams.data;
    this.init();
  }

  init() {
    this.loadingCtrl.onLoading();
    this.productService.getProductByID(this.navParams.data._id)
      .then(data => {
        this.product = data;
        this.product.isFavorite = this.isFavoriteService(this.product);
        console.log(this.product);
        this.loadingCtrl.dismiss();
      }, err => {
        this.loadingCtrl.dismiss();
      });
  }

  isFavoriteService(product) {
    let favorites = this.favoriteService.getFavoriteList();
    this.favoriteListModel = favorites ? favorites : { items: [] };

    let isFavorite = false;

    for (var i = 0; i < this.favoriteListModel.items.length; i++) {
      let element = this.favoriteListModel.items[i];
      if (element._id === product._id) {
        isFavorite = true;
        break;
      }
    }
    return isFavorite;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  selectedFavorite(product) {
    product.image = product.images[0];
    product.isFavorite = !product.isFavorite;
    this.favoriteService.addFavorite(product);
  }
  reviewModal(e) {
    let reviewModal = this.modalCtrl.create(WritereviewPage);
    reviewModal.onDidDismiss(data => {
      if (data && data.topic !== '' && data.comment !== '' && data.rate !== '') {
        this.loadingCtrl.onLoading();
        this.productService.reviewProduct(this.product._id, data)
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

  addToCart(product) {
    let user = JSON.parse(window.localStorage.getItem('jjuser'));
    window.localStorage.setItem('jjProduct', JSON.stringify(product));
    if (user) {
      this.loadingCtrl.onLoading();
      // this.cartService.addToCart(product);
      this.navCtrl.push(CartPage);
      this.loadingCtrl.dismiss();
    } else {
      this.loadingCtrl.onLoading();
      // this.cartService.addToCart(product);
      this.showLogInPage();
      this.loadingCtrl.dismiss();
    }
  }

  showLogInPage() {
    this.navCtrl.push(LoginPage);
  }
}
