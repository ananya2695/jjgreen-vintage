import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { EcommerceCoreModule, IonIconSearchbarComponent, IonListGridComponent ,IonFormProfileComponent, IonListCartComponent ,IonListProductComponent,IonDetailProductComponent} from "@ngcommerce/core";
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

    IonIconSearchbarComponent,
    IonListGridComponent,
    IonFormProfileComponent,
    IonListCartComponent,
    IonListProductComponent,
    LoginPage,
    ProductDetailPage,
    IonDetailProductComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp),
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
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    Facebook,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
