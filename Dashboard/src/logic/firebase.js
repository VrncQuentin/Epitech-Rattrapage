import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCrmuq5G05K2QaM4wY10WZ1Nr4y2own5UM", //TODO: env.process.AKEY_FIREBASE
    projectId: "app-dashboard-2020",
    authDomain: "app-dashboard-2020.firebaseapp.com",
    appId: "1:850806446178:web:abc9dfd0303aef2131d93b"
}

firebase.initializeApp(config);
export const auth = firebase.auth();

//export const github = new firebase.auth.GithubAuthProvider().addScope('repo');
export var github = new firebase.auth.GithubAuthProvider();
github.addScope('repo');

/*
Docs:
https://firebase.google.com/docs/reference/js/firebase.User
https://firebase.google.com/docs/reference/js/firebase.auth.Auth
https://firebase.google.com/docs/reference/js/firebase.auth.Auth#fetchsigninmethodsforemail
https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect
https://firebase.google.com/docs/reference/js/firebase.auth.TwitterAuthProvider

https://firebase.google.com/docs/reference/js/firebase.auth#usercredential
https://firebase.google.com/docs/auth/web/manage-users

https://firebase.google.com/docs/web/setup
 */
