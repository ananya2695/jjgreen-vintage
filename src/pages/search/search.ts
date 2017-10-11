import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductListModel, ProductService } from "@ngcommerce/core";
import { Http } from '@angular/http';
import { ProductDetailPage } from '../product-detail/product-detail';
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
  maxLength: number = 0;
  dataItems: Array<any> = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public http: Http,
    public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad SearchPage');
    this.getListProduct();
  }

  getListProduct() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.productService.getProductList().then((data) => {

      this.setDataInfinite(data);

      loading.dismiss();
      console.log(data);
    }, (error) => {
      loading.dismiss();
      console.error(error);
    });
  }

  setDataInfinite(data) {

    if (this.maxLength > 0) {
      let pages = data.items.length / this.maxLength;
      let paper = 0;
      for (let i = 0; i < pages; i++) {
        this.dataItems.push(data.items.slice(paper, paper + this.maxLength));
        paper += this.maxLength;
      }

      this.product.items = this.dataItems[0];
    } else {
      this.product = data;
    }

  }

  selectedProduct(item) {
    this.navCtrl.push(ProductDetailPage, item);
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      if (this.dataItems.length > 0) {
        this.product.items = this.product.items.concat(this.dataItems[0]);
        this.dataItems.splice(0, 1);
      }

      infiniteScroll.complete();
    }, 500);

  }

}
