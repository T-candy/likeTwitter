import { Component, ViewChild, ViewChildren, QueryList, NgZone  } from '@angular/core';
import { NavController, AlertController, Events, NavParams, ModalController } from 'ionic-angular';
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
  firedata = firebase.database().ref('/users');
  loggedin = this.navParams.get("loggedin");

  post;
  allposts = [];
  allmyposts = [];
  imgornot;
  comment : any;
  comments = [];

  temparr = [];
  filteredusers = [];

  public tap: number = 0;
  public count: number = 0;

  constructor(
    private http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
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

  ionViewDidEnter() {
    this.feedservice.getposts();
    console.log(this.allposts);
  }

  profile() {
    this.loggedin = false;
    this.navCtrl.push('ContactPage', {
      loggedin: this.loggedin
    })
  }

  // 新規投稿
  addpost() {
  this.comment = false;
  let profileModal = this.modalCtrl.create('PosteditPage', {
    comment: this.comment
  });
   profileModal.present();
}

 tapEvent(e) {
    this.tap++
  }

  comments(p) {
    this.post = p;
    this.comment = true;
    let profileModal = this.modalCtrl.create('PosteditPage', {
      post: this.post,
      comment: this.comment
    });
     profileModal.present();
  }


}