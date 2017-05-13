import { Router } from '@angular/router';
import { SearchService } from './../service/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  private searchContent: string;
  private searchResult;

  constructor(private searchService: SearchService, private router: Router) {
    this.searchContent = this.searchService.searchContent;
  }

  ngOnInit() {

  }

  resultSearch(): void {
    this.searchService.search(this.searchContent);
    this.searchResult = this.searchService.getSearchResult;
    console.log("keep this search result: ", this.searchResult);
  }

  goToDetail(id: string): void {
    console.log(`/details/${id}`);
    this.router.navigate([`/details/${id}`]);
  }



}
