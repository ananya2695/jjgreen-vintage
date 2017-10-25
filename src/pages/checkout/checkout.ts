import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { CheckoutModel, PaymentModel, ListAddressModel, CartService, AddressService, PaymentService, OrderService, OmiseService } from "@ngcommerce/core";
import { FormAddressPage } from './../form-address/form-address';
import { CompletePage } from './../complete/complete';
import { LoadingProvider } from '../../providers/loading/loading';
import { Constants } from '../../app/app.contant';
import { InAppBrowser } from '@ionic-native/in-app-browser';


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
  datapayment: any = {
    payment: {}
  };
  omiseGenTokenRes: any = {};
  omiseRes: any = {};
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
  omiseKey: any = {};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public cartService: CartService,
    public addressService: AddressService,
    public paymentService: PaymentService,
    public orderService: OrderService,
    public app: App,
    public loadingCtrl: LoadingProvider,
    public omiseServie: OmiseService,
    private iab: InAppBrowser
  ) {
    this.getShippingData();
    this.getAddressData();
    this.getPayment();
    this.omiseKey = Constants.OmiseKey;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  getShippingData() {
    // this.loadingCtrl.onLoading();
    setTimeout(() => {
      this.shipping = this.cartService.getCartStorage();
    }, 1000);
    // this.loadingCtrl.dismiss();
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
    // this.loadingCtrl.onLoading();
    this.paymentService.getPaymentList().then((data) => {
      this.payment = data[0];
      console.log(this.payment);
      // this.loadingCtrl.dismiss();
    }, (err) => {
      // this.loadingCtrl.dismiss();
      console.error(err);
    });
  }

  completedShippingStep(e) {
    this.datashipping = e;
    // alert('completedShippingStep');
    this.currentstep = 2;
  }

  completedPaymentStep(e) {
    this.datapayment = e;
    // console.log(e);
    // alert('completedPaymentStep');
    if (e.order.payment.paymenttype === 'Credit Card') {
      this.omiseServie.checkTokenByCredit(this.omiseKey, e.order.payment).then((data) => {
        console.log(data);
        this.omiseGenTokenRes = data;
        this.currentstep = 3;
      }, (err) => {
        alert(err.message);
        this.currentstep = 2;
      });
    } else {
      this.currentstep = 3;
    }

    // this.currentstep = 3;

  }

  completedConfirmStep(e) {
    this.dataconfirm = e;
    console.log(this.dataconfirm);
    if (this.dataconfirm) {
      if (this.dataconfirm.payment.paymenttype === 'Credit Card') {
        this.loadingCtrl.onLoading();
        this.omiseServie.paymenyByCredit(this.omiseKey, this.omiseGenTokenRes.id, this.dataconfirm.totalamount).then((data) => {
          this.omiseRes = data;
          this.loadingCtrl.dismiss();
          this.createOrder();
        }, (err) => {
          this.loadingCtrl.dismiss();
          alert(JSON.stringify(err));
        });
      } else if (this.dataconfirm.payment.paymenttype === 'Bank Transfer') {
        let bank = '';
        if (this.dataconfirm.payment.counterservice === 'KTB') {
          bank = 'internet_banking_ktb';
        } else if (this.dataconfirm.payment.counterservice === 'SCB') {
          bank = 'internet_banking_scb';
        } else if (this.dataconfirm.payment.counterservice === 'BBL') {
          bank = 'internet_banking_bbl'; //กรุงเทพ
        } else if (this.dataconfirm.payment.counterservice === 'BAY') {
          bank = 'internet_banking_bay'; //กรุงศรี
        }
        this.loadingCtrl.onLoading();
        this.omiseServie.paymenyByBank(this.omiseKey, bank, this.dataconfirm.totalamount).then((data) => {
          this.omiseRes = data;
          this.loadingCtrl.dismiss();
          this.iab.create(this.omiseRes.authorize_uri);
          this.createOrder();
        }, (err) => {
          this.loadingCtrl.dismiss();
          alert(JSON.stringify(err));
        });
      } else {
        this.createOrder();
      }
    }
  }

  createOrder() {
    this.dataconfirm.omiseresponse = this.omiseRes;
    this.orderService.createOrder(this.dataconfirm).then((data) => {
      // this.navCtrl.push(CompletePage);
      window.localStorage.setItem('order', JSON.stringify(data));
      this.app.getRootNav().setRoot(CompletePage); // set full page
    }, (error) => {
      console.error(error);
    });
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
