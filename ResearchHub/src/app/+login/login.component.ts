import { Router } from '@angular/router';
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

<<<<<<< HEAD
  formUser: User = {
    'username': '',
    'password': ''
  };

  constructor(private authService: AuthService) { }
=======
  constructor(private router: Router) { }
>>>>>>> 49337a2358164e7c93c517af99619fc5ac44da56

  ngOnInit() {
  }

<<<<<<< HEAD
  login(): void {
    this.authService.login(this.formUser.username, this.formUser.password);
  }

=======
  toSignup(): void {
    this.router.navigate(["/signup"])
  }
>>>>>>> 49337a2358164e7c93c517af99619fc5ac44da56
}
