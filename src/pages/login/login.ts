import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { CorService, UserModel, AuthenService } from "@ngcommerce/core";
import { TabnavPage } from '../tabnav/tabnav';


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
  constructor(public navCtrl: NavController, public navParams: NavParams, public authenService: AuthenService, public viewCtrl: ViewController, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(user) {
    let loading = this.loading.create();
    loading.present();
    this.authenService.signIn(user).then((data) => {
      this.user = data; ///////////////////// บรรทัดนี้ตอนแรกยังไม่มี มาเขียนเพิ่มตอนที่จะไปโชว์ที่หน้าจอ ตามขั้นตอนด้านล่าง
      console.log(data);
      window.localStorage.setItem('jjuser', JSON.stringify(data));
      loading.dismiss();
      // this.navCtrl.push(TabnavPage);
      this.viewCtrl.dismiss(data);
    }, (error) => {
      console.error(error);
      loading.dismiss();
    });
  }



}
