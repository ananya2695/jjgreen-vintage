import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { SignupModel } from "@ngcommerce/core";
import { UserModel, AuthenService, CartService } from "@ngcommerce/core";
import { LoginPage } from '../login/login';
import { LoadingProvider } from '../../providers/loading/loading';
import { TabnavPage } from '../tabnav/tabnav';
import { RegisterModel } from './register.model';
import { RegisterProvider } from '../../providers/register/register';
import { OneSignal } from '@ionic-native/onesignal';
import { Dialogs } from '@ionic-native/dialogs';
import { CompleteServiceProvider } from '../../providers/complete-service/complete-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  signup: RegisterModel = new RegisterModel();
  isEmail = true;
  postcode: any = {
    locationcode: "",
    subdistrict: "",
    district: "",
    province: "",
    postcode: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authenService: AuthenService,
    public loadingCtrl: LoadingProvider,
    public cartService: CartService,
    public app: App,
    public registerProvider: RegisterProvider,
    public oneSignal: OneSignal,
    public platform: Platform,
    private dialogs: Dialogs,
    public completeServiceProvider: CompleteServiceProvider
  ) {

    // if (this.navParams.data.first_name) {
    //   this.signup.firstName = this.navParams.data.first_name;
    //   this.signup.lastName = this.navParams.data.last_name;
    //   this.signup.email = this.navParams.data.email;
    //   this.signup.password = 'jjUsr#Pass1234';
    //   this.signup.profileImageURL = this.navParams.data.picture.data.url;
    // }

    if (this.navParams.get('tel')) {
      this.signup.username = this.navParams.get('tel');
      this.signup.password = 'jjUsr#Pass1234';
      this.signup.tel = this.navParams.get('tel');
      console.log(this.signup);
    }

    if (this.navParams.get('facebook')) {
      this.isEmail = false;
      this.signup.firstName = this.navParams.get('facebook').first_name;
      this.signup.lastName = this.navParams.get('facebook').last_name;
      this.signup.email = this.navParams.get('facebook').email;
      this.signup.profileImageURL = this.navParams.get('facebook').picture.data.url;
      this.signup.username = this.navParams.get('facebook').email;
      this.signup.password = 'jjUsr#Pass1234';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onRegister() {
    this.loadingCtrl.onLoading();
    this.registerProvider.regisAndAddress(this.signup).then((data) => {
      window.localStorage.setItem('jjuser', JSON.stringify(data));
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
      this.loadingCtrl.dismiss();
    }, (error) => {
      this.loadingCtrl.dismiss();
      this.dialogs.alert(JSON.parse(error._body).message, 'Register');
    });
  }

  getCartByUser() {
    let user = JSON.parse(window.localStorage.getItem('jjuser'));

    this.cartService.getCartByUser(user._id).then((data) => {
      this.cartService.saveCartStorage(data);
      window.localStorage.setItem('selectedTab', '2');
      this.app.getRootNav().setRoot(TabnavPage);
    }, (error) => {

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
      this.dialogs.alert(JSON.parse(error._body).message, 'Register');

    });

  }

  updateCart(cart) {
    this.cartService.updateCart(cart).then((data) => {
      console.log('update success.');
      this.cartService.saveCartStorage(data);
      this.getCartByUser();
    }, (error) => {
      this.dialogs.alert(JSON.parse(error._body).message, 'Register');
      // this.navCtrl.push(LoginPage);
    });
  }
  selectPostcode(e) {
    this.signup.postcode = e.postcode;
    this.signup.subdistrict = e.subdistrict;
    this.signup.district = e.district;
    this.signup.province = e.province;
  }

  autoInput(e) {
    this.signup.postcode = '';
    this.signup.subdistrict = '';
    this.signup.district = '';
    this.signup.province = '';
  }
}
