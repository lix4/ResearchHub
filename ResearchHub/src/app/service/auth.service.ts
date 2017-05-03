import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from "rxjs/Observable";
@Injectable()
export class AuthService {
  public _isSignedIn = false;
  public _currentUserId: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.subscribe((authState: FirebaseAuthState) => {
      if (authState) {
        console.log("You are signed in. All is good!");
        console.log(authState.auth.email);
        this._isSignedIn = true;
        this._currentUserId = authState.uid;
      } else {
        console.log("You are not signed in!");
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
        console.log("Sucessfully registered!!");
        console.log(authState);
        this.router.navigate(['/']);
        return authState;
      })
      .catch((error) => {
        console.log("fail!!!");
        throw error;
      });
  }

  login(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    console.log(email);
    return this.afAuth.login({
      email: email,
      password: password
    }, { provider: AuthProviders.Password, method: AuthMethods.Password })
      .then((authState: FirebaseAuthState) => {
        console.log("Sucessfully logged in!!");
        console.log(authState);
        this.router.navigate(['/main']);
        return authState;
      })
      .catch((error) => {
        console.log("fail login!!!");
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
