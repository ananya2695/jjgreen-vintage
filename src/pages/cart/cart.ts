import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartModel, CartService } from "@ngcommerce/core";
import { CheckoutPage } from './../checkout/checkout';
import { LoginPage } from '../login/login';
import { LoadingProvider } from '../../providers/loading/loading';


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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public loadingCtrl : LoadingProvider    
  ) {

  }

  ionViewWillEnter() {
    let user = JSON.parse(window.localStorage.getItem('jjuser'));

    if (user) {
      this.loadingCtrl.onLoading();

      let cartStorage = this.cartService.getCartStorage();
      if (cartStorage) {
        if (cartStorage.items && cartStorage.items.length > 0) {
          this.cart = cartStorage;
          this.onCalculate();
        }
      }

      this.loadingCtrl.dismiss();
    } else {

      this.showLogInPage();

    }

  }

  showLogInPage() {
    this.navCtrl.push(LoginPage);
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
      alert(JSON.parse(error._body).message);
    });

  }

  updateCart(cart) {
    this.cartService.updateCart(cart).then((data) => {
      console.log('update success.');
      this.cartService.saveCartStorage(data);
    }, (error) => {
      alert(JSON.parse(error._body).message);
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
