import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,PopoverController } from 'ionic-angular';
import { FormControl,FormGroup,Validators } from "@angular/forms";
import { LoginProvider } from '../../providers/login/login';
import { PasswordValidator } from '../../validators/passwordvalidator';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loginService:LoginProvider,public loadingCtrl: LoadingController,
              public popoverCtrl:PopoverController,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
    loading.dismiss();
    this.registerSuccess(); 
  },
  (err:any)=>{
    console.log(err.status);
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
      console.log(err.status);
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
   
} 