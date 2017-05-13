import { FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class TopicService {
  public topicStream: FirebaseListObservable<string[]>;

  constructor() {
    
  }



}
