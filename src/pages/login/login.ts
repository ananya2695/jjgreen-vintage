import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { UserModel, AuthenService, CartService } from "@ngcommerce/core";
import { TabnavPage } from '../tabnav/tabnav';
import { RegisterPage } from '../register/register';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { OneSignal } from '@ionic-native/onesignal';
import { LoadingProvider } from '../../providers/loading/loading';

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
    private fb: Facebook,
    public cartService: CartService,
    public oneSignal: OneSignal,
    public platform: Platform,
    public loadingCtrl: LoadingProvider,
    public app: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user) {
    this.loadingCtrl.onLoading();
    this.authenService.signIn(user).then((data) => {
      console.log(data);
      window.localStorage.setItem('jjuser', JSON.stringify(data));

      this.getCartByUser();

      if (this.platform.is('cordova')) {

        this.oneSignal.getIds().then((data) => {
          this.authenService.pushNotificationUser({ id: data.userId });
        });

      }
    }, (error) => {
      alert(JSON.parse(error._body).message);
      this.loadingCtrl.dismiss();
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
        this.fb.api('me?fields=id,last_name,first_name,picture,email', null).then((user: FacebookLoginResponse) => {
          this.loginWithFacebook(user);
        })
          .catch(e => {
            alert(JSON.stringify(e));
          })

      })

      .catch(e => alert('Error logging into Facebook ' + JSON.stringify(e)));


    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  loginWithFacebook(resdata) {
    let user = {
      username: resdata.email,
      password: 'jjUsr#Pass1234'
    }

    this.loadingCtrl.onLoading();
    this.authenService.signIn(user).then((data) => {
      console.log(data);
      window.localStorage.setItem('jjuser', JSON.stringify(data));

      this.getCartByUser();

      if (this.platform.is('cordova')) {

        this.oneSignal.getIds().then((data) => {
          this.authenService.pushNotificationUser({ id: data.userId });
        });

      }
    }, (error) => {
      // alert(JSON.parse(error._body).message);
      this.loadingCtrl.dismiss();
      this.navCtrl.push(RegisterPage, { facebook: resdata });
    });

  }

  getCartByUser() {
    let user = JSON.parse(window.localStorage.getItem('jjuser'));

    this.cartService.getCartByUser(user._id).then((data) => {
      this.cartService.saveCartStorage(data);
      this.app.getRootNav().setRoot(TabnavPage);
      this.loadingCtrl.dismiss();
    }, (error) => {
      this.loadingCtrl.dismiss();
    });
  }

}
