import { Topic } from './../models/topic.model';
import { TopicService } from './../service/topic.service';
import { SearchService } from './../service/search.service';
import { MdDialogConfig, MdDialog } from '@angular/material';
import { NewSourceComponent } from "../new-source/new-source.component";
import { AuthService } from "../service/auth.service";
import { Subscription } from 'rxjs/Subscription';
import { Resource } from './../models/resource.model';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public subjects: any;
  public searchContent: string;
  public topicSubscription: Subscription;

  constructor(private topicService: TopicService, private searchService: SearchService, public authService: AuthService, private af: AngularFire, private router: Router, private dialog: MdDialog) {
    this.topicSubscription = this.topicService.subjectsMap.subscribe( (subjects) => {
      this.subjects = subjects
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.topicSubscription.unsubscribe()
  }

  mainSearch(): void {
    this.searchService.search(this.searchContent);
    this.router.navigate(['/results'])
  }



  newSource(): void {
    if (this.authService._isSignedIn) {
      var dialogConfig = new MdDialogConfig()
      dialogConfig.data = {
        userid: this.authService._currentUserId
      }
      dialogConfig.width = "1000px"
      this.dialog.open(NewSourceComponent, dialogConfig)
    }
  }

  showResultsFor(subject:Topic):void {
    this.searchService.setSearchResult = subject.ids
    this.searchService.searchContent = subject.subject
    this.router.navigate(['/results'])
  }

}
