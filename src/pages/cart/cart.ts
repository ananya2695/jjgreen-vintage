import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { CartModel, CartService, UserModel } from "@ngcommerce/core";
import { CheckoutPage } from './../checkout/checkout';
import { LoginPage } from '../login/login';
import { LoadingProvider } from '../../providers/loading/loading';
import { Dialogs } from '@ionic-native/dialogs';



/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cart = {} as CartModel;
  user = {} as UserModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public loadingCtrl: LoadingProvider,
    public app: App,
    private dialogs: Dialogs
  ) {

  }

  ionViewWillEnter() {
    let user = JSON.parse(window.localStorage.getItem('jjuser'));
    let product = JSON.parse(window.localStorage.getItem('jjProduct'));
    this.user = user;
    if (user) {
      this.loadingCtrl.onLoading();
      if (product) {
        this.cartService.getCartByUser(user._id).then((data) => {
          this.cartService.saveCartStorage(data);
          this.cartService.addToCart(product);
          window.localStorage.removeItem('jjProduct');
          let cartStorage = this.cartService.getCartStorage();
          if (cartStorage) {
            if (cartStorage.items && cartStorage.items.length > 0) {
              this.cart = cartStorage;
              this.onCalculate();
            }
          }

          this.loadingCtrl.dismiss();
        }, (err) => {
          console.log(err);
          this.loadingCtrl.dismiss();
        });
      } else {
        let cartStorage = this.cartService.getCartStorage();
        if (cartStorage) {
          if (cartStorage.items && cartStorage.items.length > 0) {
            this.cart = cartStorage;
            this.onCalculate();
          }
        }

        this.loadingCtrl.dismiss();
      }

    }

  }

  showLogInPage() {
    this.app.getRootNav().setRoot(LoginPage);
  }

  ionViewWillLeave() {
    this.cart = this.cartService.getCartStorage();
    let user = JSON.parse(window.localStorage.getItem('jjuser'));

    console.log(this.cart);
    if (user) {
      this.onCalculate();
      if (this.cart && this.cart._id) {
        this.updateCart(this.cart);
      } else {
        this.createCart(this.cart);
      }
    }
  }

  createCart(cart) {
    // this.loadingCtrl.onLoading();
    this.cartService.createCart(cart).then((data) => {
      console.log('create success.');
      this.cartService.saveCartStorage(data);
      // this.loadingCtrl.dismiss();
    }, (error) => {
      // this.loadingCtrl.dismiss();
      this.dialogs.alert(JSON.parse(error._body).message, 'Cart');
    });

  }

  updateCart(cart) {
    this.cartService.updateCart(cart).then((data) => {
      console.log('update success.');
      this.cartService.saveCartStorage(data);
    }, (error) => {
      this.dialogs.alert(JSON.parse(error._body).message, 'Cart');
      this.navCtrl.push(LoginPage);
    });
  }

  returnItems(event) {
    this.onCalculate();
    this.cartService.saveCartStorage(this.cart);
  }

  onCalculate() {
    this.cart = this.cartService.onCalculate(this.cart);
  }
  gotocheckout() {
    this.navCtrl.push(CheckoutPage)
  }

}
