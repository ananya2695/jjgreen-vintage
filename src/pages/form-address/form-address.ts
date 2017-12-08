import { Dialogs } from '@ionic-native/dialogs';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
// import { AddressModel } from "@ngcommerce/core";
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CompleteServiceProvider } from '../../providers/complete-service/complete-service';
import { AutoCompleteComponent } from 'ionic2-auto-complete';

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
  @ViewChild('searchbar') searchbar: AutoCompleteComponent;  
  address: FormGroup;
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
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    private dialogs: Dialogs,
    public completeServiceProvider : CompleteServiceProvider
  ) {
    this.address = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      subdistrict: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      postcode: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad FormAddressPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  validation_messages = {
    'firstname': [
      { type: 'required', message: 'กรุณากรอกชื่อ.' }
    ],
    'lastname': [
      { type: 'required', message: 'กรุณากรอกนามสกุล.' }
    ],
    'address': [
      { type: 'required', message: 'กรุณากรอกที่อยู่.' }
    ],
    'subdistrict': [
      { type: 'required', message: 'กรุณากรอกตำบลหรือแขวง.' }
    ],
    'district': [
      { type: 'required', message: 'กรุณากรอกอำเภอหรือเขต.' }
    ],
    'province': [
      { type: 'required', message: 'กรุณากรอกจังหวัด.' }
    ],
    'postcode': [
      { type: 'required', message: 'กรุณากรอกรหัสไปรษณีย์.' }
    ],
    'tel': [
      { type: 'required', message: 'กรุณากรอกเบอร์โทร.' }
    ]
  };
  saveAddress(values) {
    if (values) {
      if (values.province) {
        values.postcode = this.searchbar.getValue()
      } else {
        values.postcode = '';
      }

      if (!values.firstname) {
        this.dialogs.alert('กรุณากรอกชื่อ', 'ข้อมูลไม่ครบถ้วน');
        return;
      } else if (!values.lastname) {
        this.dialogs.alert('กรุณากรอกนามสกุล', 'ข้อมูลไม่ครบถ้วน');
        return;
      } else if (!values.postcode) {
        this.dialogs.alert('กรุณากรอกรหัสไปรษณีย์', 'ข้อมูลไม่ครบถ้วน');
        return;
      } else if (!values.subdistrict) {
        this.dialogs.alert('กรุณากรอกตำบลหรือแขวง', 'ข้อมูลไม่ครบถ้วน');
        return;
      } else if (!values.district) {
        this.dialogs.alert('กรุณากรอกอำเภอหรือเขต', 'ข้อมูลไม่ครบถ้วน');
        return;
      } else if (!values.province) {
        this.dialogs.alert('กรุณากรอกจังหวัด', 'ข้อมูลไม่ครบถ้วน');
        return;
      } else if (!values.address) {
        this.dialogs.alert('กรุณากรอกที่อยู่', 'ข้อมูลไม่ครบถ้วน');
        return;
      } else if (!values.tel) {
        this.dialogs.alert('กรุณากรอกเบอร์โทร', 'ข้อมูลไม่ครบถ้วน');
        return;
      }
      this.viewCtrl.dismiss(values);
    }
  }
  selectPostcode(e) {
    this.postcode = e;
  }

  autoInput(e) {
    // console.log(e.length);
    this.address.value.postcode = "";
    this.postcode = {
      locationcode: "",
      subdistrict: "",
      district: "",
      province: "",
      postcode: ""
    };
  }
}
