import { Review } from './../models/review.model';
import { Resource } from './../models/resource.model';
import { Router } from '@angular/router';
import { SearchService } from './../service/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public searchContent: string;
  public searchResults = this.searchService.getSearchResult;
  hasResults = true;

  constructor(public searchService: SearchService, private router: Router) {
    this.searchContent = this.searchService.searchContent;
    this.hasResults = this.searchResults.length == 0;
  }

  ngOnInit() {
  }

  resultSearch(): void {
    this.searchService.search(this.searchService.searchContent);
    this.searchResults = this.searchService.getSearchResult;

  }

  goToDetail(id: string): void {
    this.router.navigate([`/details/${id}`]);
  }

}
