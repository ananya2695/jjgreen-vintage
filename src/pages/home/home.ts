import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductListModel, ProductService } from "@ngcommerce/core";
import { LoginPage } from '../login/login';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
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
  product = {} as ProductListModel;
  homeData = {};
  pages: string;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public productService: ProductService, public http: Http, public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad HomePage');
    this.getListProduct();
    this.getHomeData();
  }

  getHomeData() {
    this.pages = '0';
    this.http.get('https://greenvintage-v1.herokuapp.com/api/dataofcategories')
      .toPromise()
      .then((response) => {
        this.homeData = response.json();
        console.log(this.homeData);
      })
      .catch((handleError) => {
        console.log(handleError);
      });
  }

  onSelectedPage(index) {
    this.pages = index;
  }

  getListProduct() {
    this.productService.getProductList().then((data) => {
      this.product = data; ///////////////////// บรรทัดนี้ตอนแรกยังไม่มี มาเขียนเพิ่มตอนที่จะไปโชว์ที่หน้าจอ ตามขั้นตอนด้านล่าง
      console.log(data);
    }, (error) => {
      let err = JSON.parse(error._body);
      console.log(err);
      if (err.message === 'Token is incorrect or has expired. Please login again') {
        window.localStorage.removeItem('jjuser');
        this.app.getRootNav().setRoot(LoginPage);
      }
      console.log(error);
    });

  }

}
