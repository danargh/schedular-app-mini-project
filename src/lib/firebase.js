// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import {
   getAuth,
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(initFirebase);
if (!getApps().length) {
   initializeApp(firebaseConfig);
}

export const firebaseAuth = getAuth();

// export const signIn = signInWithEmailAndPassword(auth, email, password)
//    .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       // ...
//    })
//    .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//    });

export const signIn = async (email, password) => {
   await signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const signUp = async (email, password) => {
   await createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const signOutAccount = async () => {
   await signOut(firebaseAuth);
};

export const signInGoogle = async () => {
   const provider = new GoogleAuthProvider();
   await signInWithPopup(firebaseAuth, provider);
};

export const getSignInErrorMessage = (errorCode) => {
   switch (errorCode) {
      case "auth/invalid-email":
         return "Invalid email address format.";
      case "auth/user-disabled":
         return "This account has been disabled.";
      case "auth/user-not-found":
         return "No account found with this email address.";
      case "auth/wrong-password":
         return "Invalid password.";
      default:
         return "An undefined Error happened.";
   }
};

export const getSignUpErrorMessage = (errorCode) => {
   switch (errorCode) {
      case "auth/email-already-in-use":
         return "Email already in use.";
      case "auth/invalid-email":
         return "Invalid email address format.";
      case "auth/weak-password":
         return "Password should be at least 6 characters.";
      default:
         return "An undefined Error happened.";
   }
};
