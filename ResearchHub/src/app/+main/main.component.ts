import { SearchService } from './../service/search.service';
import { MdDialogConfig, MdDialog } from '@angular/material';
import { NewSourceComponent } from "../new-source/new-source.component";
import { AuthService } from "../service/auth.service";
import { Subscription } from 'rxjs/Subscription';
import { Resource } from './../models/resource.model';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  // sources = [
  //   { title: "Test", quantity: 12 },
  //   { title: "Forests", quantity: 90 },
  //   { title: "Test", quantity: 12 },
  //   { title: "Test", quantity: 12 },
  //   { title: "Test", quantity: 12 },
  // ]
  private searchContent: string;

  constructor(private searchService: SearchService, public authService: AuthService, private af: AngularFire, private router: Router, private dialog: MdDialog) {

  }

  ngOnInit() {

  }

  mainSearch(): void {
    this.searchService.search(this.searchContent);
  }



  newSource(): void {
    if (this.authService._isSignedIn) {
      var dialogConfig = new MdDialogConfig()
      dialogConfig.data = {
        userid: this.authService._currentUserId
      }
      dialogConfig.width = "1000px"
      this.dialog.open(NewSourceComponent, dialogConfig)
    }
  }

}
