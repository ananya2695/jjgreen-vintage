import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CorService, ProductListModel, ProductService } from "@ngcommerce/core";
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public productService: ProductService, public http: Http, public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad HomePage');
    if(!this.getUser()){
      this.presentLoginModal();
    }
    this.getListProduct();    
  }

  getUser(){
    return JSON.parse(window.localStorage.getItem('jjuser'));
  }

  presentLoginModal() {
    let profileModal = this.modalCtrl.create(LoginPage);
    profileModal.present();
  }

  getListProduct() {
    this.productService.getProductList().then((data) => {
      this.product = data; ///////////////////// บรรทัดนี้ตอนแรกยังไม่มี มาเขียนเพิ่มตอนที่จะไปโชว์ที่หน้าจอ ตามขั้นตอนด้านล่าง
      console.log(data);
    }, (error) => {
      let err = JSON.parse(error._body);
      console.log(err);
      if(err.message === 'Token is incorrect or has expired. Please login again'){
        this.presentLoginModal();
      }
      console.error(error);
    });

  }

}
