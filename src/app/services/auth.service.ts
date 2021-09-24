import { UserService } from './user.service';
import { UserProfile } from './../models/User.model';
import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) { }

//For Creating Users
  creatUser(email: string,
            password: string,
            userName: string,
            age: number) {
    return new Promise<void>(
      (resolve, reject) => {
        const auth: Auth = getAuth();
        const user: UserProfile = new UserProfile(userName, age, email, password);

        createUserWithEmailAndPassword(auth, email, password).then(
          () => {
            resolve();
            this.userService.creatUser(user);
          },
          (error) => {
            reject(error);
          },
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
            this.userService.findUserIndex(email);
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
