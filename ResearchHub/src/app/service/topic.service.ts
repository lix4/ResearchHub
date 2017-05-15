import { element } from 'protractor';
import { FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class TopicService {
  public topicStream: FirebaseListObservable<string[]>;
  private myDB: any;
  public subjectsMap: Map<string, Array<Object>>;

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

        this.subjectsMap = new Map<string, Array<Object>>(subjects);
        subjects.forEach((subject) => {

          for (var key in subject.data.subjects) {

            var id = subject.id;
            if (!this.subjectsMap.has(subject.data.subjects[key])) {
              firebase.database().ref().child("resources").child(id).on("value", (snapshot: firebase.database.DataSnapshot) => {
                this.subjectsMap.set(subject.data.subjects[key], [snapshot.toJSON()]);
              });
            } else {
              firebase.database().ref().child("resources").child(id).on("value", (snapshot: firebase.database.DataSnapshot) => {
                var temp = this.subjectsMap.get(subject.data.subjects[key]);
                temp.push(snapshot.toJSON());

              });
              // console.log(temp);
            }
          }
        });
        console.log();

      });
  }




}
