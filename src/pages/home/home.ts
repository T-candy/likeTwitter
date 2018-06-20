import { Component, ViewChild, ViewChildren, QueryList, NgZone  } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FeedProvider } from '../../providers/feed/feed';
import firebase from 'firebase';

// For swipe cards
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {StackConfig, Stack, Card, ThrowEvent, DragEvent, SwingStackComponent, SwingCardComponent} from 'angular2-swing';
import { empty } from 'rxjs/observable/empty';
import { isEmpty } from 'rxjs/operator/isEmpty';
/// For swipe cards

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  post;
  allposts = [];
  imgornot;

  temparr = [];
  filteredusers = [];

  constructor(
    private http: Http,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public events: Events,
    public zone: NgZone,
    public userservice: UserProvider,
    public feedservice: FeedProvider
  ) {
    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
    })

    this.events.subscribe('newpost', () => {
      this.allposts = [];
      this.zone.run(() => {
        this.allposts = this.feedservice.allposts;
    })
  })
  }

  profile() {
    this.loggedin = false;
    this.navCtrl.push(ContactPage, {
      loggedin: this.loggedin
    })
  }

  // 新規投稿
  addpost() {
  let alert = this.alertCtrl.create({
    title: '新規投稿',
    inputs: [
      {
        name: 'post',
        placeholder: '今どうしてる？'
      }
    ],
    buttons: [
      {
        text: 'やめる',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '投稿',
        handler: data => {
          console.log('message data:', data);
          // this.post = data;
          this.feedservice.addnewpost(data.post).then(() => {
            this.post = '';
          })
      }
    }
  ]
});
alert.present();
}

ionViewDidEnter() {
  this.feedservice.getposts();
}


}