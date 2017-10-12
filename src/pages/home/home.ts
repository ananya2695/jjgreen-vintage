import { ProductDetailPage } from './../product-detail/product-detail';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomeService, HomeCategoryModel, ProductItemModel } from "@ngcommerce/core";
import { ListShopPage } from '../list-shop/list-shop';
import { ListProductPage } from '../list-product/list-product';
import { SearchPage } from '../search/search';
import { ShopDetailPage } from '../shop-detail/shop-detail';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  homeData = {} as HomeCategoryModel;
  lastVisit = [] as Array<ProductItemModel>;
  pages: string;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public homeService: HomeService,
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad HomePage');
    this.getHomeData();
    this.getLastVisit();
  }

  getHomeData() {
    this.pages = '0';
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="lds-css ng-scope">
                  <div style="width:100%;height:100%" class="lds-eclipse">
                    <div class="div-image">
                      <img src="./assets/icon/icon.png" class="loading-image">
                    </div>
                    <div class="spin">
                    </div>
                  </div>
                </div>`
    });
    loading.present();
    this.homeService.getHome().then((data) => {
      this.homeData = data;
      loading.dismiss();
    }, (error) => {
      console.log(error);
      loading.dismiss();
    });

  }

  getLastVisit() {
    this.lastVisit = this.homeService.getLastVisit();
  }

  onSelectedPage(index) {
    this.pages = index;
  }

  gotoProductDetail(e) {
    this.navCtrl.push(ProductDetailPage, e);
  }

  gotoListShop(cate) {
    this.navCtrl.push(ListShopPage, cate);
  }

  gotoListProduct(cate) {
    this.navCtrl.push(ListProductPage, cate);
  }

  gotoSearchPage() {
    this.navCtrl.push(SearchPage);
  }

  gotoShopDetail(e) {
    this.navCtrl.push(ShopDetailPage, e);
  }
}
