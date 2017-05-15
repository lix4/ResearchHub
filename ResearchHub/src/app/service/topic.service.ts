import { element } from 'protractor';
import { FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";

@Injectable()
export class TopicService {
  public topicStream: FirebaseListObservable<string[]>;
  private myDB: any;
  public _subjectsMap: Map<string, Array<Object>> = new Map<string, Array<Object>>()

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

        this._subjectsMap = new Map<string, Array<Object>>(subjects);
        subjects.forEach((subject) => {

          for (var key in subject.data.subjects) {

            var id = subject.id;
            if (!this._subjectsMap.has(subject.data.subjects[key])) {
              firebase.database().ref().child("resources").child(id).on("value", (snapshot: firebase.database.DataSnapshot) => {
                this._subjectsMap.set(subject.data.subjects[key], [snapshot.toJSON()]);
              });
            } else {
              firebase.database().ref().child("resources").child(id).on("value", (snapshot: firebase.database.DataSnapshot) => {
                var temp = this._subjectsMap.get(subject.data.subjects[key]);
                temp.push(snapshot.toJSON());

              });
              // console.log(temp);
            }
          }
        });
        console.log();

      });
  }

  get subjectsMap(): Observable<Map<string, Array<Object>>> {
    return Observable.of(this._subjectsMap)
  }




}
