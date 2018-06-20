import { Component,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  // userData: any;
  avatar: string;
  displayName: string;
  email: string;

  constructor(
    // private facebook: Facebook,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userservice: UserProvider,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public imghandler: ImghandlerProvider) {}
  // constructor(public navCtrl: NavController) {}

  ionViewWillEnter() {
    this.loaduserdetails();
  }

// ユーザー情報取得
  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.email = res.email;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }

// プロフィール写真変更
  editimage() {
    // let statusalert = this.alertCtrl.create({
    //   buttons: ['okay']
    // });
    // this.imghandler.uploadimage().then((url: any) => {
    //   this.userservice.updateimage(url).then((res: any) => {
    //     if (res.success) {
    //       statusalert.setTitle('Updated');
    //       statusalert.setSubTitle('Your profile pic has been changed successfully!!');
    //       statusalert.present();
    //       this.zone.run(() => {
    //       this.avatar = url;
    //     })
    //     }
    //   }).catch((err) => {
    //       statusalert.setTitle('Failed');
    //       statusalert.setSubTitle('Your profile pic was not changed');
    //       statusalert.present();
    //   })
    //   })
      this.navCtrl.push('ProfilepicPage');
  }

// 名前変更
  editname() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    let alert = this.alertCtrl.create({
      title: '名前の編集',
      inputs: [{
        name: 'nickname',
        placeholder: 'Nickname'
      }],
      buttons: [{
        text: 'キャンセル',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: '編集',
        handler: data => {
          if (data.nickname) {
            this.userservice.updatedisplayname(data.nickname).then((res: any) => {
              if (res.success) {
                statusalert.setTitle('Updated');
                statusalert.setSubTitle('Your nickname has been changed successfully!!');
                statusalert.present();
                this.zone.run(() => {
                  this.displayName = data.nickname;
                })
              }
              else {
                statusalert.setTitle('Failed');
                statusalert.setSubTitle('Your nickname was not changed');
                statusalert.present();
              }

            })
          }
        }

      }]
    });
    alert.present();
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.parent.parent.setRoot('LoginPage');
    })
  }
}
