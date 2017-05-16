import { element } from 'protractor';
import { FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import { Topic } from "../models/topic.model";
import { Resource } from "../models/resource.model";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class TopicService {
  private myDB: any;
  public _subjectsMap: Map<string, Array<Resource>> = new Map<string, Array<Resource>>()
  public _subjects: Topic[] = []
  public subjects: BehaviorSubject<Topic[]> = new BehaviorSubject<Topic[]>([])

  constructor() {

    firebase.database().ref().child("resources").on("value",
      (snapshot: firebase.database.DataSnapshot) => {
        this.myDB = snapshot.toJSON();

        let subjects = [];
        snapshot.forEach((snapshot) => {

          if (snapshot.hasChild("subjects")) {
            subjects.push({ id: snapshot.key, data: snapshot.toJSON() });
          }
          return false;
        });

        this._subjectsMap = new Map<string, Array<Resource>>(subjects);
        subjects.forEach((subject) => {

          for (var key in subject.data.subjects) {

            var id = subject.id;
            if (!this._subjectsMap.has(subject.data.subjects[key])) {
              firebase.database().ref().child("resources").child(id).on("value", (snapshot: firebase.database.DataSnapshot) => {
                var source = new Resource(snapshot.toJSON())
                source.$key = id
                this._subjectsMap.set(subject.data.subjects[key], [source]);
              });
            } else {
              firebase.database().ref().child("resources").child(id).on("value", (snapshot: firebase.database.DataSnapshot) => {
                var temp = this._subjectsMap.get(subject.data.subjects[key]);
                var source = new Resource(snapshot.toJSON())
                source.$key = id
                temp.push(source);

              });
              // console.log(temp);
            }
          }
        });
        this._subjects = []
        this._subjectsMap.forEach( (value: Resource[], key:string) => {
          if (value != undefined && value.length > 0) {
            var subject : Topic = new Topic({
              subject: key,
              ids: value
            })
            this._subjects.push(subject)
          }
        })
        this.subjects.next(this._subjects)
      });
  }

  get subjectsMap(): Observable<Topic[]> {
    return this.subjects
  }
}
