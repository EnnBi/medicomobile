import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import { TabsPage } from '../pages/tabs/tabs';

@Component({ 
  templateUrl: 'app.html'
})
export class MyApp {  
  rootPage:any = LoginPage;          

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log(' in constructor yappp---- ')
      this.storage.get('token').then(data=>{
        console.log(data+'---data')
        this.rootPage = data?TabsPage:LoginPage;  
      });
        statusBar.styleDefault();
    });
  }

  gettoken() {
    return Observable.fromPromise(this.storage.get('token'));
  }
}
  