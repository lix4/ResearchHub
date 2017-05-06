import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as Fuze from 'fuse.js';

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
  private searchContent: string;
  private fuze: Fuze;
  private searchResult;
  private fuzeConfig;

  constructor(private router: Router) {
    this.searchContent = "";
    this.fuzeConfig = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "title",
        "author.firstName",
        "subject"
      ]
    };
    this.fuze = new Fuze(this.sources, this.fuzeConfig);
  }

  ngOnInit() {

  }

  search(): void {
    //TODO: implement this function.
    console.log("searh " + this.searchContent);
    this.searchResult = this.fuze.search(this.searchContent);
    console.log(this.searchResult);

    this.router.navigate(['/results']);
  }

  newSource(): void {
    this.router.navigate(['/newSource'])
  }

}
