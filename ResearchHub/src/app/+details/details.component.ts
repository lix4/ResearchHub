import { Review } from './../models/review.model';
import { Subscription } from 'rxjs/Subscription';
import { Bookmark } from './../models/bookmark.model';
import { Resource } from './../models/resource.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";
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
  private reviewSubscription: Subscription
  private userSubscription: Subscription
  private bookmarkSubscription: Subscription
  public reviewStream: FirebaseListObservable<Review[]>
  public user: User
  public bookmarked: boolean = false
  public review: Review
  public reviewCopy: Review
  public showReviewSubmission = true
  public editingReview= false

  constructor(private af: AngularFire, private authService: AuthService, private route: ActivatedRoute) { 
    this.review = new Review()
    this.review.rating = 3
    this.routerSubscription = this.route.params.subscribe( (params: Params) => {
      this.sourceid = params['sourceid']
      this.reviewStream = af.database.list("resources/" + this.sourceid + "/reviews")
      this.reviewSubscription = this.reviewStream.subscribe( (reviews: Review[]) => {
        if (authService._currentUserId) {
          this.showReviewSubmission = true
          reviews.forEach(element => {
            if (element.author == authService._currentUserId) {
              this.showReviewSubmission = false
              this.reviewCopy = element
              console.log(this.reviewCopy)
            }
          });
        }
      })
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
        var bookmarkStream = this.af.database.list("users/" + this.userid + "/bookmarks")
        this.bookmarkSubscription = bookmarkStream.subscribe( (bookmarks: [any]) => {
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
    if (this.bookmarkSubscription)
      this.bookmarkSubscription.unsubscribe()
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

  editSource(): void {
    console.log("TODO: Implement")
  }

  deleteSource(): void {
    console.log("TODO: Implement")
  }

  onSubmit(): void {
    if (this.review.$key) {
      this.af.database.object("resources/" + this.sourceid + "/reviews/" + this.review.$key).set(this.review).then( ()=>{
        this.review = new Review()
        this.editingReview = false
      })
    } else {
      this.review.author = this.authService._currentUserId
      console.log("This is my review", this.review)
      this.af.database.list("resources/" + this.sourceid + "/reviews").push(this.review).then( ()=>{
        this.review = new Review()
      })
    }
  }

  editReview(): void {
    this.review = this.reviewCopy
    this.editingReview = true
  }

  deleteReview(): void {
    this.reviewStream.remove(this.reviewCopy.$key)
    this.review = new Review()
    this.editingReview = false
    this.showReviewSubmission = true
  }
}
