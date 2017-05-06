import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private authService: AuthService, private router: Router) {

  }

  toProfile(): void {
    this.router.navigate(['/profile'])
  }

  toBookmark(): void {
    this.router.navigate(['/bookmark'])
  }

  signOut(): void {
    this.authService.logout();
  }
}
