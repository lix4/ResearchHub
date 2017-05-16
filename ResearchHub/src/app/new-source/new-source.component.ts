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
  public action: string = "Create"
  public title: string = "New"
  private $key;

  constructor(private af: AngularFire, private router: Router, private dialogRef: MdDialogRef<NewSourceComponent>) { 
    this.data = dialogRef._containerInstance.dialogConfig.data
    this.userid = this.data.userid
    if (this.data.source) {
      this.source.title = this.data.source.title
      this.source.author = this.data.source.author
      this.source.abstraction = this.data.source.abstraction
      this.source.posted_by = this.data.source.posted_by
      this.source.url = this.data.source.url
      this.$key = this.data.source.$key
      this.sourceDate = new Date(this.data.source.date_posted)
      if (this.data.source.tags) {
        this.tags = this.data.source.tags.join(';')
      } else {
        this.tags = ""
      }
      if (this.data.source.subjects) {
        this.subjects = this.data.source.subjects.join(';')
      } else {
        this.subjects = ""
      }
      this.action = "Save"
      this.title = "Edit"
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
      if (this.$key) {
        this.af.database.object("resources/" + this.$key).update(this.source).then( ()=> {
            this.dialogRef.close()
        });
      } else {
        this.af.database.list("resources").push(this.source).then( ()=> {
            this.dialogRef.close()
        });
      }
    }
  }
}
