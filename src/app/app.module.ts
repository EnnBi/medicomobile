import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { CommonModule } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera} from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CartProvider } from '../providers/cart/cart';
import { LoginPage} from '../pages/login/login';
import { SearchProvider } from '../providers/search/search';
import { UrlProvider } from '../providers/url/url';
import { LoginProvider } from '../providers/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { OrdersProvider } from '../providers/orders/orders';
import { AccountProvider } from '../providers/account/account';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage, 
    HomePage,
    TabsPage, 
    LoginPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    HttpClientModule, 
    CommonModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [   
    MyApp,
    AboutPage, 
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage
  ],  
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CartProvider,
    SearchProvider,
    HttpClient,
    UrlProvider,
    LoginProvider,
    UrlProvider,
    LoginProvider,
    SearchProvider,
    CartProvider,
    OrdersProvider,
    AccountProvider,
    ImagePicker,
    AccountProvider
  ]
})
export class AppModule {}
