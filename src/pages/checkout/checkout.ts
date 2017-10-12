import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { CheckoutModel, PaymentModel, ListAddressModel, CartService, AddressService, PaymentService, OrderService } from "@ngcommerce/core";
import { FormAddressPage } from './../form-address/form-address';
import { CompletePage } from './../complete/complete';
import { LoadingProvider } from '../../providers/loading/loading';


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
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public cartService: CartService,
    public addressService: AddressService,
    public paymentService: PaymentService,
    public orderService: OrderService,
    public app: App,
    public loadingCtrl : LoadingProvider 
  ) {
    this.getShippingData();
    this.getAddressData();
    this.getPayment();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  getShippingData() {
    this.loadingCtrl.onLoading();
    this.shipping = this.cartService.getCartStorage();
    this.loadingCtrl.dismiss();
  }
  getAddressData() {
    this.loadingCtrl.onLoading();
    this.addressService.getAddressByUser().then((data) => {
      this.address = data;
      this.loadingCtrl.dismiss();
    }, (error) => {
      this.loadingCtrl.dismiss();
      console.error(error);
    });
  }

  getPayment() {
    this.loadingCtrl.onLoading();
    this.paymentService.getPaymentList().then((data) => {
      this.payment = data[0];
      console.log(this.payment);
      this.loadingCtrl.dismiss();
    }, (err) => {
      this.loadingCtrl.dismiss();
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
        // this.navCtrl.push(CompletePage);
        window.localStorage.setItem('order', JSON.stringify(data));
        this.app.getRootNav().setRoot(CompletePage); // set full page
      }, (error) => {
        console.error(error);
      });
    }
  }
  openFormAddress(e) {
    let modal = this.modalCtrl.create(FormAddressPage);
    modal.onDidDismiss(data => {
      this.loadingCtrl.onLoading();
      this.addressService.createAddress(data).then(resp => {
        this.loadingCtrl.dismiss();
        this.getAddressData();
      }, err => {
        this.loadingCtrl.dismiss();
      })
      console.log(data);

    });
    modal.present();
  }
}
