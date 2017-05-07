import { Resource } from './../models/resource.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { AngularFire } from "angularfire2";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private routerSubscription: Subscription
  private sourceid: string
  public source: Resource
  public date_posted: String

  constructor(private af: AngularFire, private route: ActivatedRoute) { 
    this.routerSubscription = this.route.params.subscribe( (params: Params) => {
      this.sourceid = params['sourceid']
      var tempSource = af.database.object("resources/" + this.sourceid)
      tempSource.subscribe( (snapshot: any) => {
        this.source = snapshot
        this.date_posted = new Date(this.source.date_posted).toDateString()
      })
    })
  }

  ngOnInit() {
  }

  goToSource(): void {
    window.open(this.source.url)
  }

}
