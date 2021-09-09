import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBvFENvJhsI_EPLG2R4uTpCewrsP5YUsBI",
      authDomain: "share-ur-op.firebaseapp.com",
      projectId: "share-ur-op",
      storageBucket: "share-ur-op.appspot.com",
      messagingSenderId: "935345095721",
      appId: "1:935345095721:web:e677e64d6cb2b308b70838",
      measurementId: "G-5KF50P43FL"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }

}
