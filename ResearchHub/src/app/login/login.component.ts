import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { SignupComponent } from "../signup/signup.component";

interface User {
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  formUser: User = {
    'username': '',
    'password': ''
  };

  constructor(private dialogRef: MdDialogRef<LoginComponent>, private authService: AuthService, private router: Router, public dialog: MdDialog) { }

  ngOnInit() {
  }


  login(): void {
    this.authService.login(this.formUser.username, this.formUser.password).then(() => {
      this.dialogRef.close()
    }).catch((e) => {
      document.getElementById("error").style.display = "inline"
    });
  }

  toSignup(): void {
    var dialogConfig = new MdDialogConfig()
    dialogConfig.height = "300px"
    dialogConfig.width = "400px"
    this.dialogRef.close()
    this.dialog.open(SignupComponent, dialogConfig)
  }


}
