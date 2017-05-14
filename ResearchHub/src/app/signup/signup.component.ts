import { MdDialogRef, MdDialogConfig, MdDialog } from '@angular/material';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from "../login/login.component";

interface User {
  username: string,
  password: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formUser: User = {
    'username': '',
    'password': ''
  };
  confirmPassword: string = ""


  constructor(private dialogRef: MdDialogRef<SignupComponent>, private authService: AuthService, private router: Router, public dialog: MdDialog) { }

  ngOnInit() {

  }

  register(): void {
    if (this.formUser.password == this.confirmPassword) {
      this.authService.registerUser(this.formUser.username, this.formUser.password).then(() => {
        this.dialogRef.close()
      });
    }
  }

  passwordMatch(): boolean {
    if (this.confirmPassword === this.formUser.password)
      return true
    return false
  }

  toLogin(): void {
    var dialogConfig = new MdDialogConfig()
    dialogConfig.height = "230px"
    dialogConfig.width = "400px"
    this.dialogRef.close()
    this.dialog.open(LoginComponent, dialogConfig)
  }
}
