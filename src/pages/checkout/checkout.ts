import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CheckoutModel, PaymentModel, ListAddressModel, CartService, AddressService, PaymentService, OrderService } from "@ngcommerce/core";
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public cartService: CartService, public addressService: AddressService, public paymentService: PaymentService,public orderService: OrderService) {
    this.getShippingData();
    this.getAddressData();
    this.getPayment();
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
  getAddressData() {
    this.addressService.getAddressByUser().then((data) => {
      this.address = data;
    }, (error) => {
      console.error(error);
    });
  }

  getPayment() {
    this.paymentService.getPaymentList().then((data) => {
      this.payment = data[0];
      console.log(this.payment);
    }, (err) => {
      console.error(err);
    });
  }

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
    if (this.dataconfirm) {
      this.orderService.createOrder(this.dataconfirm).then((data) => {
        // this.navCtrl.push(CompleteOrderedPage);
      }, (error) => {
        console.error(error);
      });
    }
  }
  openFormAddress(e) {
    let modal = this.modalCtrl.create(FormAddressPage);
    modal.onDidDismiss(data => {
      this.addressService.createAddress(data).then(resp => {
        this.getAddressData();
      })
      console.log(data);

    });
    modal.present();
  }
}
