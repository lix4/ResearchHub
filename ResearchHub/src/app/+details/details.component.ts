import { Subscription } from 'rxjs/Subscription';
import { Bookmark } from './../models/bookmark.model';
import { Resource } from './../models/resource.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire } from "angularfire2";
import { ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { User } from "../models/user.model";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription
  private sourceid: string
  public source: Resource
  public date_posted: String
  private userid: String
  private userSubscription: Subscription
  private bookmarkSubscription: Subscription
  public user: User
  public bookmarked: boolean = false

  constructor(private af: AngularFire, private authService: AuthService, private route: ActivatedRoute) { 
    this.routerSubscription = this.route.params.subscribe( (params: Params) => {
      this.sourceid = params['sourceid']
      var tempSource = af.database.object("resources/" + this.sourceid)
      tempSource.subscribe( (snapshot: any) => {
        this.source = snapshot
        this.date_posted = new Date(this.source.date_posted).toDateString()
      })
    })

    authService.isSignedInStream.subscribe( (isSignedIn: boolean) => {
      if (isSignedIn) {
      this.userid = authService._currentUserId
        var userStream = this.af.database.object("users/" + this.userid)
        this.userSubscription = userStream.subscribe( (user: User) => {
          this.user = user
        })
        console.log("HI")
        var bookmarkStream = this.af.database.list("users/" + this.userid + "/bookmarks")
        this.bookmarkSubscription = bookmarkStream.subscribe( (bookmarks: [any]) => {
          console.log(bookmarks)
          bookmarks.forEach( (bookmark: Bookmark)=>{
            if (bookmark.sourceKey === this.sourceid) {
              this.bookmarked = true
            }
          })
        })
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.userSubscription)
      this.userSubscription.unsubscribe()
  }

  showBookmarkLink(): boolean {
    return !this.bookmarked && this.authService._isSignedIn
  }

  bookmarkSource(): void {
    if (this.authService._currentUserId){
      this.af.database.list("users/" + this.authService._currentUserId + "/bookmarks").push(
        {title: this.source.title, sourceKey: this.sourceid}).then( ()=> {
          console.log("pushed")
      })
    }
  }

  goToSource(): void {
    window.open(this.source.url)
  }

}
