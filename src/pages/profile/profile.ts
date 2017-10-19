import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserModel, AuthenService } from "@ngcommerce/core";
import { NotificationPage } from '../notification/notification';
import { EditProfilePage } from '../edit-profile/edit-profile';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userProfile = {} as UserModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authenService: AuthenService
  ) {
  }

  ionViewWillEnter() {
    this.userProfile = JSON.parse(window.localStorage.getItem('jjuser'));
    this.isSetting();
    this.isNoti();
  }

  logout(e) {
    window.localStorage.removeItem('jjuser');
    this.userProfile = JSON.parse(window.localStorage.getItem('jjuser'));
    this.isSetting();
    this.isNoti();
  }

  notification(e) {
    this.navCtrl.push(NotificationPage);
  }

  loginModal(e) {
    this.navCtrl.push(LoginPage);
  }

  editProfile(e) {
    this.navCtrl.push(EditProfilePage);
  }

  isSetting() {
    let user = JSON.parse(window.localStorage.getItem('jjuser'));
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  isNoti() {
    let noti = JSON.parse(window.localStorage.getItem('onNotifications'));
    if (noti) {
      return true;
    } else {
      return false;
    }
  }

}
