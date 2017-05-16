import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as Fuse from 'fuse.js';
import * as firebase from 'firebase';
import { Resource } from "../models/resource.model";

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
          threshold: 0.2,
          location: 1,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            "title",
            "tags",
            "subjects"
          ]
        };
        var objArr : Resource[] = [];
        for (var key in this.firebaseRef) {
          if (this.firebaseRef.hasOwnProperty(key)) {
            var temp: Resource = new Resource(this.firebaseRef[key])
            temp.$key = key
            objArr.push(temp);
          }
        }
        this.fuse = new Fuse(objArr, this.fuzeConfig);
      });
  }

  search(item: string): void {
    this.searchContent = item;
    this.searchResult = this.fuse.search(item);
    this.router.navigate(['/results']);
  }

  get getSearchResult(): any {
    return this.searchResult;
  }

  set setSearchResult(results) {
    this.searchResult = results;
  }
}
