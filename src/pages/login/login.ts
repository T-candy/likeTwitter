import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { usercreds } from '../../models/interfaces/usercreds';
import { Facebook } from '@ionic-native/facebook';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
// import firebase from 'firebase';
// import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loggedin = false;
  items: Observable<any[]>;
  credentials = {} as usercreds;
  displayName;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authservice: AuthProvider,
    private facebook: Facebook,
    afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
    //   this.items = afDB.list('cuisines').valueChanges();
      afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    this.authservice.login(this.credentials).then((res: any) => {
      if (!res.code) {
        this.loggedin = true;
        this.navCtrl.setRoot('TabsPage', {
          loggedin: this.loggedin
        });
      }
      else
        alert(res);
    })
  }

  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  // facebookLogin cordova
  // facebookLogin(): Promise<any> {
  // return this.facebook.login(['email'])
  //   .then( response => {
  //     const facebookCredential = firebase.auth.FacebookAuthProvider
  //       .credential(response.authResponse.accessToken);
  //
  //     firebase.auth().signInWithCredential(facebookCredential)
  //       .then( success => {
  //         console.log("Firebase success: " + JSON.stringify(success));
  //       });
  //
  //   }).catch((error) => { console.log(error) });
  // }

  // 参考 https://www.youtube.com/watch?v=HW-_UIQCGFk&t=229s
  facebookLogin(){
    this.facebook.login(['email']).then((loginResponse) =>{
      let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);
      firebase.auth().signInWithCredential(credential).then((info) =>{
        alert(JSON.stringify(info));
      })
    })
  }

  // facebookLogin() {
  //   this.afAuth.auth
  //     .signInWithPopup(new firebase.auth.FacebookAuthProvider())
  //     .then(res => console.log(res));
  // }
}













