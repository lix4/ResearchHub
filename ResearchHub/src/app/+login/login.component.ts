import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth.service";

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.formUser.username, this.formUser.password);
  }

}
