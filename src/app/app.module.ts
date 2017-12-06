import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { EcommerceCoreModule, IonIconSearchbarComponent, IonListGridComponent, IonFormProfileComponent, IonListCartComponent, IonListProductComponent, IonDetailProductComponent, IonFormReviewComponent, IonFormWizardComponent, IonFormWizardStepComponent, IonFormShippingComponent, IonFormPaymentComponent, IonFormConfirmComponent, IonFormPaymentOptionComponent, IonFormCreditComponent, IonFormDeliveryComponent, IonFormCounterserviceComponent, IonListShopComponent, IonDetailShopComponent, IonBackgroundImageComponent, OmiseService, IonListScollXComponent } from "@ngcommerce/core";
import { HttpModule } from "@angular/http";
import { OneSignal } from '@ionic-native/onesignal';
import { Facebook } from '@ionic-native/facebook';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabnavPage } from '../pages/tabnav/tabnav';
import { FavoritePage } from '../pages/favorite/favorite';
import { CartPage } from '../pages/cart/cart';
import { SearchPage } from '../pages/search/search';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from "../pages/login/login";
import { Ionic2RatingModule } from 'ionic2-rating';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { RegisterPage } from '../pages/register/register';
import { CheckoutPage } from '../pages/checkout/checkout';
import { FormAddressPage } from '../pages/form-address/form-address';
import { CompletePage } from './../pages/complete/complete';
import { WritereviewPage } from '../pages/writereview/writereview';
import { NotificationPage } from '../pages/notification/notification';
import { ListShopPage } from '../pages/list-shop/list-shop';
import { ShopDetailPage } from '../pages/shop-detail/shop-detail';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ListProductPage } from '../pages/list-product/list-product';
import { LoadingProvider } from '../providers/loading/loading';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MomentPipe } from '../pipes/moment/moment';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { CompleteServiceProvider } from '../providers/complete-service/complete-service';

import { ImagePicker } from "@ionic-native/image-picker";
import { Base64 } from "@ionic-native/base64";
import { IonUploadImagesComponent } from '../components/ion-upload-image/ion-upload-image';
import { RegisterProvider } from '../providers/register/register';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FavoritePage,
    CartPage,
    SearchPage,
    ProfilePage,
    TabnavPage,
    LoginPage,
    RegisterPage,
    CheckoutPage,
    FormAddressPage,
    CompletePage,
    WritereviewPage,
    IonFormWizardComponent,
    IonFormWizardStepComponent,
    IonFormShippingComponent,
    IonFormPaymentComponent,
    IonFormConfirmComponent,
    IonFormPaymentOptionComponent,
    IonFormCreditComponent,
    IonFormDeliveryComponent,
    IonFormCounterserviceComponent,
    IonIconSearchbarComponent,
    IonListGridComponent,
    IonFormProfileComponent,
    IonListCartComponent,
    IonListProductComponent,
    LoginPage,
    ProductDetailPage,
    IonDetailProductComponent,
    IonFormReviewComponent,
    NotificationPage,
    ListShopPage,
    IonListShopComponent,
    ShopDetailPage,
    IonDetailShopComponent,
    EditProfilePage,
    ListProductPage,
    IonBackgroundImageComponent,
    MomentPipe,
    IonUploadImagesComponent,
    IonListScollXComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ionic2RatingModule,
    AutoCompleteModule,
    IonicModule.forRoot(MyApp,{
      SegmentButton:'segment',
      mode: 'ios'
    }),
    EcommerceCoreModule.forRoot('https://greenvintage-v2.herokuapp.com/api/')
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FavoritePage,
    CartPage,
    SearchPage,
    ProfilePage,
    TabnavPage,
    LoginPage,
    ProductDetailPage,
    RegisterPage,
    CheckoutPage,
    FormAddressPage,
    CompletePage,
    WritereviewPage,
    NotificationPage,
    ListShopPage,
    ShopDetailPage,
    EditProfilePage,
    ListProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    Facebook,
    OmiseService,
    InAppBrowser,
    ImagePicker,
    Base64,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoadingProvider,
    CompleteServiceProvider,
    RegisterProvider
  ]
})
export class AppModule { }
