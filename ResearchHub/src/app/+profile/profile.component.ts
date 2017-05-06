import { AngularFireModule, AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Subscription } from "rxjs/Subscription";
import { User } from "../models/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private userid: string;
  private userSubscription: Subscription;
  public user: User;
  public userEmail: string;
  public editingName: boolean = false;
  public tempName: string;

  constructor(public authService: AuthService, private router: Router, private af: AngularFire) { 
    if (authService._isSignedIn) {
      this.userid = authService._currentUserId
      console.log(this.userid);
      this.userEmail = authService._currentUserEmail
      var userStream = this.af.database.object("users/" + this.userid)
      this.userSubscription = userStream.subscribe( (user: User) => {
        this.user = user
      })
    } else {
      this.router.navigate([''])
    }
  }

  ngOnInit() {
  }

  editName(): void {
    this.tempName = this.user.name
    this.editingName = true
  }

  onSubmit(): void {
    this.user.name = this.tempName
    this.af.database.object("users/" + this.userid).set(this.user)
    this.editingName = false
  }

}
