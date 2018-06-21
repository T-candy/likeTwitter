import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/*
Generated class for the FeedProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class FeedProvider {
  firefeed = firebase.database().ref('/feed');
  allposts = [];
  allmyposts = [];
  avatar: string;
  displayName: string;
  comments = [];

  constructor(public http: HttpClient,
    public events: Events,
    public userservice: UserProvider
) {
    console.log('Hello FeedProvider Provider');
  }

  // post追加
  addnewpost(post) {
  var promise = new Promise((resolve, reject) => {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.avatar = res.photoURL;
      this.firefeed.child('posts').push().set({
        message: post,
        sentby: firebase.auth().currentUser.uid,
        photoURL: this.avatar,
        displayName: this.displayName,
        postid: this.firefeed.child('posts').push().key,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    })
  })
  return promise;
}

// Feed受信
getposts() {
let temp;
this.firefeed.child('posts').orderByChild('timestamp').limitToLast(20).on('value', (snapshot) => {
  this.allposts = [];
  temp = snapshot.val();
  for (var tempkey in temp) {
    this.allposts.push(temp[tempkey]);
  }
  this.events.publish('newpost');
})
}

// myFeed受信
getmyposts() {
let temp;
this.firefeed.child('posts').on('value', (snapshot) => {
  this.allmyposts = [];
  temp = snapshot.val();
  for (var tempkey in temp) {
    if (temp[tempkey].sentby === firebase.auth().currentUser.uid) {
      this.allmyposts.push(temp[tempkey]);
    }
  }
  this.events.publish('newmypost');
})
}

  //コメント追加
  addnewcommet(thepost,comment) {
  var promise = new Promise((resolve, reject) => {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.avatar = res.photoURL;
      this.firefeed.child('comments').push().set({
        comment: comment,
        postid: thepost.postid,
        sentby: firebase.auth().currentUser.uid,
        photoURL: this.avatar,
        displayName: this.displayName,
        commentid: this.firefeed.child('comments').push().key,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    })
  })
  return promise;
  }

  //投稿ごとのコメントを取得
  getcomment() {
  this.firefeed.child('comments').on('value', (snapshot) => {
    this.comments = [];
    temp = snapshot.val();
    for (var tempkey in temp) {
      this.comments.push(temp[tempkey]);
    }
    this.events.publish('newpost');
  })
}

}
