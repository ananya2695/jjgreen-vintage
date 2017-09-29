import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CorService, ProductListModel, ProductService } from "@ngcommerce/core";
import { Http } from '@angular/http';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  product = {} as ProductListModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public productService: ProductService, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.getListProduct();
  }
  getListProduct(){
    this.http.get('https://greenvintage-v2.herokuapp.com/api/products/')
    .map(res => res.json())
    .subscribe(data=>{
      console.log(data);
    })
  }

}
