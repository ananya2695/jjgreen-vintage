import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from "@angular/http";
import { CartModel } from "@ngcommerce/core";

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

  cart = {
    "_id": "cart1",
    "items": [
      {
        "_id": "product1",
        "product": {
          "_id": "pro0001",
          "name": "pro1",
          "detail": "pro1 detail",
          "price": 100,
          "promotionprice": null, //calculate from active promotions
          "percentofdiscount": null, //calculate from active promotions
          "currency": "THB",
          "images": [
            "https://www.beartai.com/wp-content/uploads/2017/06/Galaxy-S8-540x540.jpg"
          ]
        },
        "qty": 1,
        "amount": 100,
        "discount": null,
        "totalamount": 100
      },
      {
        "_id": "product2",
        "product": {
          "_id": "pro0002",
          "name": "pro2",
          "detail": "pro2 detail",
          "price": 200,
          "promotionprice": 180, //calculate from active promotions
          "percentofdiscount": 10, //calculate from active promotions
          "currency": "THB",
          "images": [
            "http://www.three.co.uk/cs/Satellite?blobkey=id&blobwhere=1400877649618&blobcol=urldata&blobtable=MungoBlobs"
          ]
        },
        "qty": 1,
        "amount": 200,
        "discount": 20,
        "totalamount": 180
      }
    ],
    "amount": 300,
    "discount": 20,
    "totalamount": 280
  } as CartModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  returnItems(event) {
    this.onCalculate();
  }

  onCalculate() {
    this.cart.amount = 0;
    this.cart.discount = 0;
    this.cart.totalamount = 0;

    for (var i = 0; i < this.cart.items.length; i++) {
      let item = this.cart.items[i];
      let promotionprice = item.product.promotionprice ? item.product.promotionprice : 0;
      item.amount = item.product.price * item.qty;
      item.discount = promotionprice > 0 ? (item.product.price - promotionprice) * item.qty : 0;
      item.totalamount = item.amount - item.discount;

      this.cart.amount += item.amount;
      this.cart.discount += item.discount;
      this.cart.totalamount += item.totalamount;
    }

  }

}
