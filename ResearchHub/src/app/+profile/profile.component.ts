import { AngularFireModule, AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Subscription } from "rxjs/Subscription";
import { User } from "../models/user.model";
import { MdDialogConfig, MdDialog } from "@angular/material";
import { AddPhotoComponent } from "../add-photo/add-photo.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private userid: string;
  private userSubscription: Subscription;
  public user: User;
  public userEmail: string;
  public editingName: boolean = false;
  public tempName: string;

  constructor(public authService: AuthService, private router: Router, private af: AngularFire, public dialog: MdDialog) { 
    authService.isSignedInStream.subscribe( (isSignedIn: boolean) => {
      if (isSignedIn) {
        this.userid = authService._currentUserId
        this.userEmail = authService._currentUserEmail
        var userStream = this.af.database.object("users/" + this.userid)
        this.userSubscription = userStream.subscribe( (user: User) => {
          this.user = user
        })
      } else {
        this.router.navigate([''])
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  editPicture(): void {
    var dialogConfig = new MdDialogConfig()
    dialogConfig.data = {
      firebasePath: "users/" + this.userid,
      photo: this.user.photoUrl
    }
    dialogConfig.height = "230px"
    dialogConfig.width = "400px"
    this.dialog.open(AddPhotoComponent, dialogConfig)
  }

  editName(): void {
    this.tempName = this.user.name || ""
    this.editingName = true
  }

  onSubmit(): void {
    this.user.name = this.tempName
    this.af.database.object("users/" + this.userid + "/name").set(this.tempName)
    this.editingName = false
  }

}
