import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as Fuse from 'fuse.js';
import * as firebase from 'firebase';

@Injectable()
export class SearchService {
  public searchContent: string;
  private fuse: Fuse;
  private searchResult;
  private fuzeConfig;
  firebaseRef = [];

  constructor(private router: Router) {
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

  search(item: string): void {
    console.log("searh ", item);
    this.searchContent = item;
    this.searchResult = this.fuse.search(item);
    this.router.navigate(['/results']);
  }

  get getSearchResult(): any {
    return this.searchResult;
  }
}
