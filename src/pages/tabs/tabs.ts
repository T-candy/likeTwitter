import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  data = {
    loggedin: this.navParams.get("loggedin") ,
    employer: this.navParams.get("employer") ,
    provider: this.navParams.get("provider")
  }

  tab1Root = "AboutPage";
  tab2Root = HomePage;
  tab3Root = "ContactPage";

  constructor() {

  }
}
