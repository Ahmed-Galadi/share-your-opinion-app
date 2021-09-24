import { getDatabase, ref, set, onValue } from 'firebase/database';
import { UploadService } from './upload.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserProfile } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: UserProfile[] = [];
  usersSubject = new Subject<UserProfile[]>();

  constructor(private uploadService: UploadService) { }

  emitUsers() {
    this.usersSubject.next(this.users);
  }

  saveUsers() {
    const db = getDatabase();
    set(ref(db, '/users'), this.users);
  }

  getUsers() {
    const db = getDatabase();
    const dataRef = ref(db, '/users');

    onValue(dataRef,
      (dataSnapshot) => {
        this.users = dataSnapshot.val() ? dataSnapshot.val() : [];
        this.emitUsers();
      }
    );
  }

  getSingleUser(index: number) {
    const db = getDatabase();
    const dataRef = ref(db, `/users/${index}`);

    return new Promise<UserProfile>(
      (resolve, reject) => {
        onValue(dataRef,
          (dataSnapshot) => {
            resolve(dataSnapshot.val());
          },
          (error) => {
            reject(error);
          },
          {
            onlyOnce: true
          }
        );
      }
    );
  }

  creatUser(user: UserProfile) {
    this.users.push(user);
    this.saveUsers();
    this.emitUsers();
  }

  removeUser(user: UserProfile) {
    this.uploadService.deleteUserImage(user);

    const userIndexToRemove = this.users.findIndex(
      (userElement) => {
        if(userElement === user) {
          return true;
        } else {
          return false;
        }
      }
    );

    this.users.splice(userIndexToRemove, 1);
    this.saveUsers();
    this.getUsers();
  }

  findUserIndex(userEmail: string) {
    this.usersSubject.subscribe((users: UserProfile[]) => this.users = users);
    const user = this.users.find(
      ({email}) => {
        email === userEmail;
      }
    );
    const userIndex: number = this.users.findIndex(
      (userElement) => {
        if(userElement === user) {
          return true;
        } else {
          return false;
        }
      }
    );
    this.getUsers();
    this.emitUsers();
    console.log(userIndex);
    return userIndex;
  }
}
