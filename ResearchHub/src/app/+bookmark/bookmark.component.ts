import { Bookmark } from './../models/bookmark.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";
import { AngularFire, FirebaseListObservable } from "angularfire2";

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  public bookmarkStream:  FirebaseListObservable<[Bookmark]>
  private userid : String

  constructor(public authService: AuthService, private router: Router, private af: AngularFire) { 
    if (authService._isSignedIn) {
      this.userid = authService._currentUserId
      this.bookmarkStream = this.af.database.list("users/" + this.userid + "/bookmarks")
    } else {
      this.router.navigate([''])
    }
  }

  ngOnInit() {
  }

  goToBookmark(bookmark: Bookmark) {
    this.router.navigate(["/details/" + bookmark.sourceKey])
  }

  deleteBookmark(bookmark: Bookmark) {
    this.af.database.object("users/" + this.userid + "/bookmarks/" + bookmark.$key).remove()
  }

}
