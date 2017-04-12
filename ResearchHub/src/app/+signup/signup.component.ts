import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  register(): void {
    this.authService.registerUser(this.formUser.username, this.formUser.password);
  }

}
