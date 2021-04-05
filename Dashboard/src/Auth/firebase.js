import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCrmuq5G05K2QaM4wY10WZ1Nr4y2own5UM",
    authDomain: "app-dashboard-2020.firebaseapp.com",
    projectId: "app-dashboard-2020",
    storageBucket: "app-dashboard-2020.appspot.com",
    messagingSenderId: "850806446178",
    appId: "1:850806446178:web:abc9dfd0303aef2131d93b"
});

export const auth = app.auth();
export const github = new firebase.auth.GithubAuthProvider().addScope('repo');