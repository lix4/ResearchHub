import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-source',
  templateUrl: './new-source.component.html',
  styleUrls: ['./new-source.component.scss']
})
export class NewSourceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submit(): void {
    this.router.navigate(["/"])
  }
}
