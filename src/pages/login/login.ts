import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,PopoverController, ToastController, Platform } from 'ionic-angular';
import { FormControl,FormGroup,Validators } from "@angular/forms";
import { LoginProvider } from '../../providers/login/login';
import { PasswordValidator } from '../../validators/passwordvalidator';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{

  private opt: string = 'signin';
  opacity:boolean=false;
  signupForm: FormGroup;
  signinForm:FormGroup;
  user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loginService:LoginProvider,public loadingCtrl: LoadingController,
              public popoverCtrl:PopoverController,public storage: Storage,public toastCtrl:ToastController,
              private fb:Facebook,private google:GooglePlus,private platform: Platform,private splashScreen: SplashScreen) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.platform.ready().then(()=>{
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    console.log('---------in init----------------')
   this.signupForm = new FormGroup({
    firstName :new FormControl("", Validators.required),
    lastName:new FormControl("", Validators.required),
    email:new FormControl("", Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]\.[a-zA-Z0-9-.]+$')
    ])),
    password:new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
    confirmPassword:new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ])
   },{
     validators:PasswordValidator.MatchPassword
   });
 
   this.signinForm = new FormGroup({
     email:new FormControl("",Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]\.[a-zA-Z0-9-.]+$')
            ])),
     password:new FormControl("",[Validators.required,Validators.minLength(8)])
   })
   console.log('----signinform inint--------');
   console.log(this.signinForm.value);
  }

  signUp() {
    // TODO: Use EventEmitter with form value
    let loading = this.loadingCtrl.create({
      content: 'Registering...'
    });

  loading.present(); 
  console.warn(this.signupForm.value);
  const user = this.signupForm.value;
  this.loginService.signup(user).subscribe(
    (res:any)=>{
      console.log('---res----')
    loading.dismiss();
    this.registerSuccess(); 
  },
  (err:any)=>{
    console.log('error----')
    console.log(err);
  });
  }

  login(){
    let loading = this.loadingCtrl.create({
      content: 'Logging in...'
    });
    loading.present(); 
    const user = this.signinForm.value;
    this.loginService.login(user).subscribe( 
      (res:any)=>{
        loading.dismiss();
        this.navCtrl.setRoot(TabsPage);
        this.storage.set('token',res.token);
        this.storage.set('roles',res.role)
    },
    (err:any)=>{
      if(err.status == 401){
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Invalid Credentials',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      else{
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Something went wrong.Please try again',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    });
  }

  registerSuccess(){
    let email = this.signupForm.get('email').value;
    let popover = this.popoverCtrl.create('RegisterSuccessPage',{email:email});
    let ev = { 
      target : {
        getBoundingClientRect : () => {
          return {
            top: '165.25'
          };
        }
      }
    }

    popover.present({ev});
    this.opacity = true;
    popover.onDidDismiss(()=>{
      this.opacity=false;
      this.signupForm.reset();
      this.opt='signin';
    });
  }
   
  loginWithFacebook(){
    let loading = this.loadingCtrl.create({
      content: 'Setting up your account...'
    });
    this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
    .then( (res: FacebookLoginResponse) => {
        // The connection was successful
        if(res.status == "connected") {
          loading.present();
            // Get user ID and Token
            var fb_id = res.authResponse.userID;
            var fb_token = res.authResponse.accessToken;
            // Get user infos from the API
            this.fb.api("/me?fields=name,email,picture.type(large)", []).then((data) => {
                // Get the connected    user details
                this.urlToBase64(data.picture.data.url,"image/jpeg").then(base64=>{
                  this.user = {
                    'firstName':data.name.split(' ')[0],
                    'lastName':data.name.split(' ')[1],
                    'email':data.email,
                    'password':data.name.split(' ')[0]+'_2018',
                    'facebookId':fb_id,
                    'facebookToken':fb_token,
                    'loginType':2,
                    'image':base64
                  }
                  this.loginService.signup(this.user).subscribe((res)=>{
                    loading.dismiss()
                    this.navCtrl.setRoot(TabsPage);
                    this.storage.set('token',res.token);
                    this.storage.set('roles',res.role)
                  });
                });

            });
            
        } 
        // An error occurred while loging-in
        else {
          loading.dismiss()

          const toast = this.toastCtrl.create({
            message: 'Something went wrong.Please try again',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
            console.log("An error occurred...");

        }
 
    })
    .catch((e) => {
      loading.dismiss()

      const toast = this.toastCtrl.create({
        message: 'Something went wrong.Please try again',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
        console.log('Error logging into Facebook', e);
    });
  }


  loginWithGoogle(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.google.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '1092540271975-7fosutr8g16ilak3fs7h6dqthdqk9622.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    }).then(data=> {
      loading.dismiss();
      this.urlToBase64(data.imageUrl,"image/jpeg").then(base64=>{
        console.log('in asbnsdn---')
        console.log(data);
        this.user = {
          'firstName':data.displayName.split(' ')[0],
          'lastName':data.displayName.split(' ')[1],
          'email':data.email,
          'password':data.displayName.split(' ')[0]+'_2018',
          'googleId':data.userId,
          'googleToken':data.accessToken,
          'googleIdToken':data.idToken,
          'loginType':3,
          'image':base64
        }
        this.loginService.signup(this.user).subscribe((res)=>{
          loading.dismiss()
          this.navCtrl.setRoot(TabsPage);
          this.storage.set('token',res.token);
          this.storage.set('roles',res.role)
        });
      });
    },(error)=> {
      loading.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Something went wrong.Please try again',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  urlToBase64(url,outputFormat){
    return new Promise( (resolve, reject) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function(){
        let canvas = <HTMLCanvasElement> document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        //callback(dataURL);
        canvas = null;
        resolve(dataURL); 
      };
      img.src = url;
    })
  }
} 