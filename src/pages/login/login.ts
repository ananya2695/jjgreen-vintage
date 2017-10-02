import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { CorService, UserModel, AuthenService } from "@ngcommerce/core";
import { TabnavPage } from '../tabnav/tabnav';
import { RegisterPage } from '../register/register';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authenService: AuthenService,
    public viewCtrl: ViewController,
    public loading: LoadingController,
    public fb: Facebook) {
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
      this.navCtrl.push(TabnavPage);
      loading.dismiss();
    }, (error) => {
      console.error(error);
      loading.dismiss();
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  loginFb() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        // this.facebookRes = JSON.stringify(res);
        this.fb.api('me?fields=email,id,name,gender', null).then((user: FacebookLoginResponse) => {
          this.navCtrl.push(RegisterPage, user);
        })
          .catch(e => {
            alert(JSON.stringify(e));
          })

      })

      .catch(e => console.log('Error logging into Facebook', e));


    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

}
