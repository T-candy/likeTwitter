import { Component,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import firebase from 'firebase';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import { FeedProvider } from '../../providers/feed/feed';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  loggedin = this.navParams.get("loggedin");
  avatar: string;
  displayName: string;
  email: string;
  allmyposts = [];

  constructor(
    // private facebook: Facebook,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userservice: UserProvider,
    public feedservice: FeedProvider,
    public events: Events,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public imghandler: ImghandlerProvider) {

      this.events.subscribe('newmypost', () => {
        this.allmyposts = [];
        this.zone.run(() => {
          this.allmyposts = this.feedservice.allmyposts;
      })
    })
  }

  ionViewWillEnter() {
    console.log("trueの場合自分",this.loggedin);
    console.log("自分の投稿",this.allmyposts);
    this.loaduserdetails();
    this.loadmyposts();
  }

  loadmyposts() {
    this.feedservice.getmyposts();
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

  config() {
    this.navCtrl.push('ConfigPage');
  }
}
