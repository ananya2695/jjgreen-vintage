import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupModel } from "@ngcommerce/core";
import { TabnavPage } from '../tabnav/tabnav';

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

  signup = {} as SignupModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    if(this.navParams.data){
      this.signup.firstName = this.navParams.data.first_name;  
      this.signup.lastName = this.navParams.data.last_name;
      this.signup.email = this.navParams.data.email;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onRegister() {
    this.navCtrl.push(TabnavPage);
  }

}
