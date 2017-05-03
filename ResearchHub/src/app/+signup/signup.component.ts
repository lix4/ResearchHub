<<<<<<< HEAD
import { AuthService } from './../service/auth.service';
=======
import { Router } from '@angular/router';
>>>>>>> 49337a2358164e7c93c517af99619fc5ac44da56
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

<<<<<<< HEAD
  constructor(private authService: AuthService) { }
=======
  constructor(private router: Router) { }
>>>>>>> 49337a2358164e7c93c517af99619fc5ac44da56

  ngOnInit() {

  }

  register(): void {
    this.authService.registerUser(this.formUser.username, this.formUser.password);
  }

  toLogin(): void {
    this.router.navigate(["/login"])
  }
}
