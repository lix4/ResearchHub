import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  search(): void {
    //TODO: implement this function.
    this.router.navigate(['/results']);
  }

  newSource(): void {
    this.router.navigate(['/newSource'])
  }

}
