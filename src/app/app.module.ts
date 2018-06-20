import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
// import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook'
import firebase from 'firebase';
 // Error: StaticInjectorError[HttpClient]を解決できた
import {HttpClientModule} from '@angular/common/http'
//For swipe cards
import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { FeedProvider } from '../providers/feed/feed';

export const firebaseConfig = {
  apiKey: "AIzaSyCMiBzXKAXLRCHJbUTPi19aeo6MlGt26zk",
    authDomain: "prezy-sample.firebaseapp.com",
    databaseURL: "https://prezy-sample.firebaseio.com",
    projectId: "prezy-sample",
    storageBucket: "prezy-sample.appspot.com",
    messagingSenderId: "942370456214"
};

@NgModule({
  declarations: [
    MyApp,
    // AboutPage,
    // ContactPage,
    HomePage,
    // TabsPage,
    // LoginPage
  ],
  imports: [
    BrowserModule,
    //For swipe cards
    HttpModule,
    HttpClientModule,
    SwingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    // IonicModule.forRoot(MyApp,{tabsPlacement:"top"}),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // AboutPage,
    // ContactPage,
    HomePage,
    // TabsPage,
    // LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FilePath,
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    AngularFireDatabase,
    Facebook,
    AuthProvider,
    UserProvider,
    ImghandlerProvider,
    RequestsProvider,
    ChatProvider,
    FeedProvider
  ]
})
export class AppModule {}