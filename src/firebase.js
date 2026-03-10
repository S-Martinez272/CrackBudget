//firebase.js
//created firebase app and authentication, connected firebase 2 react

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKcppKmc8GCQpKhCZqWVjUiFVlBtrbme8",
  authDomain: "crak-265ce.firebaseapp.com",
  projectId: "crak-265ce",
  storageBucket: "crak-265ce.firebasestorage.app",
  messagingSenderId: "353780568106",
  appId: "1:353780568106:web:77b3ec26f591de44d57353",
  measurementId: "G-2XX6DPJDB1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);