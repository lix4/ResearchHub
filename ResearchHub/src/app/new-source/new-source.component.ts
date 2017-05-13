import { MdDialogRef, MdDialog } from '@angular/material';
import { Resource } from './../models/resource.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire } from "angularfire2";

@Component({
  selector: 'app-new-source',
  templateUrl: './new-source.component.html',
  styleUrls: ['./new-source.component.scss']
})
export class NewSourceComponent implements OnInit {
  public source: Resource = new Resource()
  public sourceDate : Date;
  public tags: string
  public subjects: string
  private data: any
  private userid: string;

  constructor(private af: AngularFire, private router: Router, private dialogRef: MdDialogRef<NewSourceComponent>) { 
    this.data = dialogRef._containerInstance.dialogConfig.data
    this.userid = this.data.userid
    if (this.data.source) {
      this.source = this.data.source
      this.data = new Date(this.source.date_posted)
      this.tags = this.source.tags.join(';')
      this.subjects = this.source.subjects.join(';')
    }
  }

  ngOnInit() {
  }

  submit(): void {
    if (this.source.title && this.source.author && this.source.url) {
      var tempDate = new Date(this.sourceDate)
      this.source.date_posted = tempDate.getTime()
      this.source.posted_by = this.userid
      this.source.tags = this.tags.split(";")
      this.source.subjects = this.subjects.split(";")
      this.af.database.list("resources").push(this.source).then( ()=> {
          this.dialogRef.close()
      });
    }
  }
}
