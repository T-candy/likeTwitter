import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from 'ionic-angular';

/*
Generated class for the FeedProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class FeedProvider {
  firefeed = firebase.database().ref('/feeds');
  allposts = [];
  counts = [];

  constructor(public http: HttpClient,public events: Events) {
    console.log('Hello FeedProvider Provider');
  }

  // post追加
  addnewpost(post) {
  this.countposts();
  var promise = new Promise((resolve, reject) => {
    this.firefeed.child(firebase.auth().currentUser.uid).push({
      message: post,
      count: this.counts.length,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
      resolve(true);
    }).catch((err) => {
      reject(err);
    })
  })
  return promise;
}

//post数
countposts() {
this.firefeed.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
  this.counts = [];
  for (var key in snapshot.val()) {
    this.counts.push(key);
  }
})
}

// Feed受信
getposts() {
let temp;
this.firefeed.child(firebase.auth().currentUser.uid).orderByChild('count').limitToLast(20).on('value', (snapshot) => {
  this.allposts = [];
  temp = snapshot.val();
  for (var tempkey in temp) {
    this.allposts.push(temp[tempkey]);
  }
  this.events.publish('newpost');
})
}

}
