import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from "rxjs/Observable";
@Injectable()
export class AuthService {
  public _isSignedIn = false;
  public _currentUserId: string;
  public _currentUserEmail: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.subscribe((authState: FirebaseAuthState) => {
      if (authState) {
        this._isSignedIn = true;
        this._currentUserEmail = authState.auth.email
        this._currentUserId = authState.uid;
      } else {
        this._isSignedIn = false;
      }
    });
  }

  registerUser(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this.afAuth.createUser({
      email: email,
      password: password
    })
      .then((authState: FirebaseAuthState) => {
        this.router.navigate(['/']);
        return authState;
      })
      .catch((error) => {
        throw error;
      });
  }

  login(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this.afAuth.login({
      email: email,
      password: password
    }, { provider: AuthProviders.Password, method: AuthMethods.Password })
      .then((authState: FirebaseAuthState) => {
        this.router.navigate(['/main']);
        return authState;
      })
      .catch((error) => {
        throw error;
      });
  }

  logout(): void {
    this.afAuth.logout();
  }

  get isSignedInStream(): Observable<boolean> {
    return this.afAuth.map<FirebaseAuthState, boolean>((authState: FirebaseAuthState) => {
      return authState != null;
    });
  }

}
