import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedProvider } from '../../providers/feed/feed';

/**
 * Generated class for the PosteditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postedit',
  templateUrl: 'postedit.html',
})
export class PosteditPage {

  post;
  comment = this.navParams.get("comment");
  thepost = this.navParams.get("post");
  thecomment;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public feedservice: FeedProvider
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PosteditPage');
    console.log(this.thepost);
  }

  back() {
    this.navCtrl.pop();
  }

  newpost() {
    this.feedservice.addnewpost(this.post).then((res: any) => {
      if (!res.code) {
        console.log(this.post);
        this.post = '';
        this.navCtrl.pop();
      } else {
        console.log(res);
      }
    })
  }

  newcomment() {
    this.feedservice.addnewcommet(this.thepost,this.thecomment).then((res: any) => {
      if (!res.code) {
        console.log(this.thecomment);
        this.thecomment = '';
        this.navCtrl.pop();
      } else {
        console.log(res);
      }
    })
  }

}
