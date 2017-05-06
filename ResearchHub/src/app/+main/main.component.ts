import { MdDialogConfig, MdDialog } from '@angular/material';
import * as Fuze from 'fuse.js';
import { NewSourceComponent } from "../new-source/new-source.component";
import { AuthService } from "../service/auth.service";
import { Subscription } from 'rxjs/Subscription';
import { Resource } from './../models/resource.model';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as Fuse from 'fuse.js';
import * as firebase from 'firebase';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  sources = [
    { title: "Test", quantity: 12 },
    { title: "Forests", quantity: 90 },
    { title: "Test", quantity: 12 },
    { title: "Test", quantity: 12 },
    { title: "Test", quantity: 12 },
  ]
  ResourceStream: FirebaseListObservable<Resource[]>;
  private searchContent: string;
  private fuse: Fuse;
  private searchResult;
  private fuzeConfig;
  firebaseRef = [];

  constructor(public authService: AuthService, private af: AngularFire, private router: Router, private dialog: MdDialog) {
    // this.firebaseRef = [];
    firebase.database().ref().child("resources").on("value",
      (snapshot: firebase.database.DataSnapshot) => {
        this.firebaseRef = snapshot.val();


        //config fuse.js
        this.searchContent = "";
        this.fuzeConfig = {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            "data.title",
            "data.tags",
            "data.subjects"
          ]
        };
        var objArr = [];
        for (var key in this.firebaseRef) {
          if (this.firebaseRef.hasOwnProperty(key)) {
            objArr.push({
              data: this.firebaseRef[key],
              id: key
            });
          }
        }
        console.log("test", objArr);
        this.fuse = new Fuse(objArr, this.fuzeConfig);
      });
  }

  ngOnInit() {

  }

  search(): void {
    //TODO: implement this function.
    console.log("searh ", this.searchContent);
    this.searchResult = this.fuse.search(this.searchContent);
    console.log(this.searchResult);

    // this.router.navigate(['/results']);
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

}
