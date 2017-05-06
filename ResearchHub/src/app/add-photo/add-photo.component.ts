import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {
  private data: any
  private firebasePath: string
  photo: string

  constructor(private dialogRef: MdDialogRef<AddPhotoComponent>) { 
    this.data = dialogRef._containerInstance.dialogConfig.data
    this.firebasePath = this.data.firebasePath
    this.photo = ""
    if (this.data.photo) {
      Object.assign(this.photo, this.data.photo)
    }
  } 
  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close()
  }

  save(): void {
    if (this.photo != null && this.photo != undefined && this.photo != "") {
      firebase.database().ref().child(this.firebasePath).child("photoUrl").set(this.photo)
      this.dialogRef.close()
    }
  }

  uploadPicture(event: any): void {
    document.getElementById("uploadBar").style.display = "none"
    document.getElementById("spinner").style.display = "inline"
    const nextAvailableKey = firebase.database().ref().child("photos").child("list").push({}).key
    const file: File  = event.target.files[0]
    const metadata = {"content-type": file.type}
    const storageRef: firebase.storage.Reference = firebase.storage().ref().child("photos").child("list").child(nextAvailableKey)
    const uploadTask : firebase.storage.UploadTask = storageRef.put(file, metadata)
    uploadTask.then((snapshot: firebase.storage.UploadTaskSnapshot) => {
      this.photo = snapshot.downloadURL
      document.getElementById("uploadBar").style.display = "inline"
      document.getElementById("spinner").style.display = "none"
    })
  }

}
