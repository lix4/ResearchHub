import { TopicService } from './service/topic.service';
import { SearchService } from './service/search.service';
import { AuthService } from './service/auth.service';
import { RouterModule } from "@angular/router";
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { MainComponent } from './+main/main.component';
import { ResultsComponent } from './+results/results.component';
import { DetailsComponent } from './+details/details.component';
import { ProfileComponent } from './+profile/profile.component';
import { BookmarkComponent } from './+bookmark/bookmark.component';
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewSourceComponent } from './new-source/new-source.component';
import { AddPhotoComponent } from "./add-photo/add-photo.component";
import { RatingModule } from "ngx-rating";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ResultsComponent,
    DetailsComponent,
    ProfileComponent,
    BookmarkComponent,
    LoginComponent,
    SignupComponent,
    NewSourceComponent,
    AddPhotoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    AppRoutingModule,
    RatingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  entryComponents: [
    AddPhotoComponent,
    LoginComponent,
    SignupComponent,
    NewSourceComponent
  ],
  providers: [AuthService, SearchService, TopicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
