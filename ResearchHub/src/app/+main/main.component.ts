import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  sources = [
    {title: "Test", quantity:12 },
    {title: "Forests", quantity:90 },
    {title: "Test", quantity:12 },
    {title: "Test", quantity:12 },
    {title: "Test", quantity:12 },
  ]

constructor() { }

ngOnInit() {
}

search(): void {
  console.log("here!!");
}

}
