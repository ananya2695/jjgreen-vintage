import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { TabnavPage } from "../pages/tabnav/tabnav";
import { ProfilePage } from '../pages/profile/profile';
import { ProductDetailPage } from '../pages/product-detail/product-detail';

import { CartService } from "@ngcommerce/core";
import * as firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabnavPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private oneSignal: OneSignal,
    public cartService: CartService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if (platform.is('cordova')) {
        this.onSignalSetup();
      }
    });
    window.localStorage.setItem('selectedTab', '0');
    this.getUser();
    this.configFirebase();
  }

  getUser() {
    let user = window.localStorage.getItem('jjuser');

    if (user) {
      this.getCartByUser();
    }
  }

  getCartByUser() {
    let user = JSON.parse(window.localStorage.getItem('jjuser'));

    this.cartService.getCartByUser(user._id).then((data) => {
      this.cartService.saveCartStorage(data);
    }, (error) => {
      window.localStorage.removeItem('jjuser');
    });
  }
  configFirebase() {
    let config = {
      apiKey: "AIzaSyActRoM7SJW0h20HTM9GrkwJICC4moOzC8",
      authDomain: "green-vintage.firebaseapp.com",
      databaseURL: "https://green-vintage.firebaseio.com",
      projectId: "green-vintage",
      storageBucket: "green-vintage.appspot.com",
      messagingSenderId: "317596581774"
    };
    firebase.initializeApp(config);
  }

  onSignalSetup() {
    this.oneSignal.startInit('d5d9533c-3ac8-42e6-bc16-a5984bef02ff', '687344947918');

    // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((onReceived) => {
      // do something when notification is received
      let notifications = window.localStorage.getItem('onNotifications') ? JSON.parse(window.localStorage.getItem('onNotifications')) : [];

      notifications.unshift({
        date: new Date(),
        message: onReceived.payload.body
      });

      window.localStorage.setItem('onNotifications', JSON.stringify(notifications));
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }
}

