import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PosteditPage } from './postedit';

@NgModule({
  declarations: [
    PosteditPage,
  ],
  imports: [
    IonicPageModule.forChild(PosteditPage),
  ],
})
export class PosteditPageModule {}
