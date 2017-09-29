import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CorService, UserModel, AuthenService } from "@ngcommerce/core";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as UserModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authenService: AuthenService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(user) {
    this.authenService.signIn(user).then((data) => {
      this.user = data; ///////////////////// บรรทัดนี้ตอนแรกยังไม่มี มาเขียนเพิ่มตอนที่จะไปโชว์ที่หน้าจอ ตามขั้นตอนด้านล่าง
      console.log(data);
      window.localStorage.setItem('jjuser',JSON.stringify(data));
      this.navCtrl.push("HomePage");
    }, (error) => {
      console.error(error);
    });
  }



}
