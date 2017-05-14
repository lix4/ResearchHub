import { element } from 'protractor';
import { FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class TopicService {
  public topicStream: FirebaseListObservable<string[]>;
  private myDB: any;

  constructor() {
    firebase.database().ref().child("resources").on("value",
      (snapshot: firebase.database.DataSnapshot) => {
        this.myDB = snapshot.toJSON();
        console.log(this.myDB);
        let subjects = [];
        snapshot.forEach((snapshot) => {
          console.log(snapshot.key);
          if (snapshot.hasChild("subjects")) {
            subjects.push({ id: snapshot.key, data: snapshot.toJSON() });
          }
          return false;
        });
        console.log("subjects", subjects);
        var topicsMap = new Map(subjects);
        subjects.forEach((subject) => {
          console.log(subject.data.subjects);
          for (var key in subject.data.subjects) {
            console.log(subject.data.subjects[key]);
            if (!topicsMap.has(subject.data.subjects[key])) {
              topicsMap.set(subject.data.subjects[key], {key});
            } else {
              var temp = topicsMap.get(subject.data.subjects[key]);
              temp.push(key);
            }
          }
        });


      });
  }




}
