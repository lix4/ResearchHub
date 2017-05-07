import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Component } from '@angular/core';
import { MdDialogConfig, MdDialog } from "@angular/material";
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private authService: AuthService, private router: Router, private dialog: MdDialog) {

  }

  toProfile(): void {
    this.router.navigate(['/profile'])
  }

  toBookmark(): void {
    this.router.navigate(['/bookmark'])
  }

  signOut(): void {
    this.router.navigate([''])
    this.authService.logout();
  }

  signIn(): void {
    var dialogConfig = new MdDialogConfig()
    dialogConfig.height = "230px"
    dialogConfig.width = "400px"
    this.dialog.open(LoginComponent, dialogConfig)
  }
}
