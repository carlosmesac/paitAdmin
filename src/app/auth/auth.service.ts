import {Injectable} from '@angular/core';
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  error: BehaviorSubject<string> = new BehaviorSubject<string>('');
  uid: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentID2: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentID: string;

  constructor(private router: Router,
              private fireAuth: AngularFireAuth,
              private fireDB: AngularFireDatabase,
  ) {

    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.setUID(user.uid);
        this.currentID2.next(user.uid);
        this.loggedIn.next(true);
      }
    });
  }


  async signUpSync(MAC: string, restaurantName: string, email: string, password: string): Promise<boolean> {
    try {
      const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
      this.currentID = newUser.user.uid;
      this.postUser(MAC,restaurantName, this.currentID, email);
      this.loggedIn.next(true);

      return true;
    } catch (err) {
      console.log(err);
      this.loggedIn.next(false);
      this.error.next(err.message);

      return false;
    }
  }

  async loginSync(email: string, password: string): Promise<boolean> {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.loggedIn.next(true);
      return true;
    } catch (err) {
      console.log(err);
      this.loggedIn.next(false);
      this.error.next(err.message);
      return false;
    }
  }


  async logoutSync(): Promise<boolean> {
    try {
      await firebase.auth().signOut();
      this.loggedIn.next(false);
      this.setUID(null);
      return true;
    } catch (err) {
      console.log(err);
      this.loggedIn.next(true);
      this.error.next(err.message);
      return false;
    }
  }

  setUID(UID: string) {
    this.currentID = UID;
  }

  getUID() {
    return this.currentID;
  }

  postUser(MAC: string, restaurantName:string,userProfileID: string, email: string) {
    const creationDate = new Date();
    const currentDate = creationDate.getFullYear() + '-' + (creationDate.getMonth() + 1) + '-' + creationDate.getDate();
    const usernameRef = this.fireDB.object('users/' + this.currentID);
    usernameRef.set({MAC: MAC, restaurantName:restaurantName, userID: userProfileID, email: email, creationDate: currentDate});

  }


}

