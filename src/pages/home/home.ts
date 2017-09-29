import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CorService, ProductListModel, ProductService } from "@ngcommerce/core";
import { Http } from '@angular/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,  public productService: ProductService, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getListProduct();
  }
  getListProduct(){
    this.http.get('https://greenvintage-v2.herokuapp.com/api/products/')
    .map(res => res.json())
    .subscribe(data=>{
      console.log(data);
    })
    // this.productService.getProductList().then((data) => {
    //   this.product = data; ///////////////////// บรรทัดนี้ตอนแรกยังไม่มี มาเขียนเพิ่มตอนที่จะไปโชว์ที่หน้าจอ ตามขั้นตอนด้านล่าง
    //   console.log(data);
    // },(error) => {
    //   console.error(error);
    // });
  }

}
