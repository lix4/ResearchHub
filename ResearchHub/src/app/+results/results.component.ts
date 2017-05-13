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
  public searchResults;

  constructor(public searchService: SearchService, private router: Router) {

  }

  ngOnInit() {

  }

  resultSearch(): void {
    this.searchService.search(this.searchContent);
    this.searchResults = this.searchService.getSearchResult;
    console.log(this.searchResults);
  }

  goToDetail(id: string): void {
    console.log(`/details/${id}`);
    this.router.navigate([`/details/${id}`]);
  }



}
