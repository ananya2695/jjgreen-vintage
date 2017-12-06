import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { UserModel, AuthenService, CartService } from "@ngcommerce/core";
import { TabnavPage } from '../tabnav/tabnav';
import { RegisterPage } from '../register/register';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { OneSignal } from '@ionic-native/onesignal';
import { LoadingProvider } from '../../providers/loading/loading';
import { Dialogs } from '@ionic-native/dialogs';

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
  tel: string = '';
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
    public app: App,
    private dialogs: Dialogs
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(data) {
    this.loadingCtrl.onLoading();
    let user = {
      username: data,
      password: 'jjUsr#Pass1234'
    }
    this.authenService.signIn(user).then((data) => {
      console.log(data);
      window.localStorage.setItem('jjuser', JSON.stringify(data));
      window.localStorage.setItem('selectedTab', '2');
      let cart = this.cartService.getCartStorage();
      let user = JSON.parse(window.localStorage.getItem('jjuser'));

      if (user) {
        if (cart && cart._id) {
          this.updateCart(cart);
        } else {
          this.createCart(cart);
        }
      }


      if (this.platform.is('cordova')) {

        this.oneSignal.getIds().then((data) => {
          this.authenService.pushNotificationUser({ id: data.userId });
        });

      }
    }, (error) => {
      // alert(JSON.parse(error._body).message);
      this.loadingCtrl.dismiss();
      this.navCtrl.push(RegisterPage, { tel: data });
    });
  }

  createCart(cart) {
    // this.loadingCtrl.onLoading();
    this.cartService.createCart(cart).then((data) => {
      console.log('create success.');
      this.cartService.saveCartStorage(data);
      this.getCartByUser();
      // this.loadingCtrl.dismiss();
    }, (error) => {
      // this.loadingCtrl.dismiss();
      this.dialogs.alert(JSON.parse(error._body).message, 'Login');

    });

  }

  updateCart(cart) {
    this.cartService.updateCart(cart).then((data) => {
      console.log('update success.');
      this.cartService.saveCartStorage(data);
      this.getCartByUser();
    }, (error) => {
      this.dialogs.alert(JSON.parse(error._body).message, 'Login');

      // this.navCtrl.push(LoginPage);
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
            this.dialogs.alert(JSON.stringify(e), 'Login');
          })

      })

      .catch(e => this.dialogs.alert('Error logging into Facebook ' + JSON.stringify(e), 'Login'));


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
      window.localStorage.setItem('selectedTab', '2');

      let cart = this.cartService.getCartStorage();
      let user = JSON.parse(window.localStorage.getItem('jjuser'));

      if (user) {
        if (cart && cart._id) {
          this.updateCart(cart);
        } else {
          this.createCart(cart);
        }
      }

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
