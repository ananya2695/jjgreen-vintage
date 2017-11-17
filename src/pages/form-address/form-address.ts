import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AddressModel } from "@ngcommerce/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompleteServiceProvider } from '../../providers/complete-service/complete-service';

/**
 * Generated class for the FormAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-address',
  templateUrl: 'form-address.html',
})
export class FormAddressPage {
  address = {} as AddressModel;
  myForm: FormGroup;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public completeServiceProvider: CompleteServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormAddressPage');
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      country: new FormControl({}, [
        Validators.required
      ])
    })
  }

  submit(): void {
    alert(JSON.stringify(this.myForm.value.country));
    // let country = this.myForm.value.country;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  saveAddress() {
    this.viewCtrl.dismiss(this.address);
  }
}
