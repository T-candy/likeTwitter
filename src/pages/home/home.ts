import { Component, ViewChild, ViewChildren, QueryList  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
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

  cards: Array<any>;
  tempCards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';
  temparr = [];
  filteredusers = [];

  constructor(
    private http: Http,
    public navCtrl: NavController,
    public userservice: UserProvider
  ) {
    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
   })
  }


}