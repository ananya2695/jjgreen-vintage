import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CheckoutModel, PaymentModel, ListAddressModel, CartService } from "@ngcommerce/core";
import { FormAddressPage } from './../form-address/form-address';


/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  address = {} as ListAddressModel;
  payment = {} as PaymentModel;
  shipping = {} as CheckoutModel;
  datashipping: any = {};
  datapayment: any = {};
  dataconfirm: any = {};
  steps: Array<any> = [
    {
      value: 1,
      title: "SHIPPING"
    },
    {
      value: 2,
      title: "PAYMENT"
    },
    {
      value: 3,
      title: "CONFIRM"
    }
  ];
  currentstep: number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public cartService: CartService) {
  this.getShippingData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  getShippingData() {
    let user = JSON.parse(window.localStorage.getItem('jjuser'));
    this.cartService.getCartByUser(user._id).then((data) => {
      console.log(data);
      this.shipping = data;
      // console.log(this.shipping);
    }, (error) => {
      console.error(error);
    });
  }
  // getAddressData() {
  //   this.checkoutServiceProvider.getAddressData().then((data) => {
  //     this.address = data;
  //     this.loading.dismiss();
  //   }, (error) => {
  //     this.log.error(error);
  //     this.loading.dismiss();
  //   });
  // }

  completedShippingStep(e) {
    this.datashipping = e;
    // alert('completedShippingStep');
    this.currentstep += 1;
  }

  completedPaymentStep(e) {
    this.datapayment = e;
    // alert('completedPaymentStep');
    this.currentstep += 1;
  }

  completedConfirmStep(e) {
    this.dataconfirm = e;
    console.log(this.dataconfirm);
    // if (this.dataconfirm && this.dataconfirm.order) {
    //   this.checkoutServiceProvider.saveOrderData(this.dataconfirm).then((data) => {
    //     this.navCtrl.push(CompleteOrderedPage);
    //   }, (error) => {
    //     this.log.error(error);
    //   });
    // }
  }
  openFormAddress(e) {
    let modal = this.modalCtrl.create(FormAddressPage);
    modal.onDidDismiss(data => {
      // this.checkoutServiceProvider.saveAddressData(data).then(resp => {
      //   this.getAddressData();
      // })
      console.log(data);

    });
    modal.present();
  }
}
