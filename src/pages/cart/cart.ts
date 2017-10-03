import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartModel, CartService } from "@ngcommerce/core";

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
    public cartService: CartService
  ) {

  }

  ionViewWillEnter() {
    let cartStorage = this.cartService.getCartStorage();
    if (cartStorage) {
      if (cartStorage.items && cartStorage.items.length > 0) {
        this.cart = cartStorage;
        this.onCalculate();
      }
    } else {
      this.cart.items = [];
    }
  }

  ionViewWillLeave() {
    let cartStorage = this.cartService.getCartStorage();
    let user = JSON.parse(window.localStorage.getItem('jjuser'));

    console.log(cartStorage);
    if (user) {
      if (cartStorage && cartStorage._id) {
        this.updateCart(cartStorage);
      } else {
        this.createCart(cartStorage);
      }
    }
  }

  createCart(cart) {
    this.cartService.createCart(cart).then((data) => {
      console.log('create success.');
      this.cartService.saveCartStorage(data);
    }, (error) => {
      alert(JSON.parse(error._body).message);
    });
  }

  updateCart(cart) {
    this.cartService.updateCart(cart).then((data) => {
      console.log('update success.');
      this.cartService.saveCartStorage(data);
    }, (error) => {
      alert(JSON.parse(error._body).message);
    });
  }

  returnItems(event) {
    this.onCalculate();
    this.cartService.saveCartStorage(this.cart);
  }

  onCalculate() {
    this.cart = this.cartService.onCalculate(this.cart);
  }

}
