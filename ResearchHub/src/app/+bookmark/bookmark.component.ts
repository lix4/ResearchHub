import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  bookmarks = [
    { title: "Test1" },
    { title: "Test2" },
    { title: "Test3" }
  ];

  constructor() { }

  ngOnInit() {
  }

}
