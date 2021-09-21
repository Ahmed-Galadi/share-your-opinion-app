import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

//For Creating Users
  creatUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        const auth: Auth = getAuth();
        
        createUserWithEmailAndPassword(auth, email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

//For User Sign-in
  signInUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        const auth: Auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  //For User Sign-out
  signOut() {
    getAuth().signOut();
  }
}
