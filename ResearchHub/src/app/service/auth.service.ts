import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
@Injectable()
export class AuthService {
  private _isSignedIn = false;
  private _currentUserId: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) {

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

}
