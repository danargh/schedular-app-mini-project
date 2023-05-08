// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {
   getFirestore,
   setDoc,
   addDoc,
   doc,
   getDoc,
   collection,
   where,
   getDocs,
   query,
   deleteDoc,
   updateDoc,
} from "firebase/firestore";
import {
   getAuth,
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   signOut,
} from "firebase/auth";

const firebaseConfig = {
   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (!getApps().length) {
   initializeApp(firebaseConfig);
}

const db = getFirestore(app);

export const firebaseAuth = getAuth();
export const fireStoreDB = db;

// ** Firebase Auth Functions ** //
export const signIn = async (email, password) => {
   await signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const signUp = async (email, password) => {
   const response = await createUserWithEmailAndPassword(firebaseAuth, email, password);
   return response;
};

export const signOutAccount = async () => {
   await signOut(firebaseAuth);
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

// ** Firebase Firestore Functions ** //
export const getUserDocument = async (uid) => {
   if (!uid) return null;
   try {
      const userDocument = await getDoc(doc(db, "users", uid));
      return {
         uid,
         ...userDocument.data(),
      };
   } catch (error) {
      console.error("Error fetching user", error.message);
   }
};

export const createUserDocument = async (user, username) => {
   if (!user) return;
   try {
      await setDoc(doc(db, "users", user.uid), {
         uid: user.uid,
         username: username,
         email: user.email,
      });
   } catch (error) {
      console.log(error.message);
   }
};

export const getEventDocument = async (userId) => {
   if (!userId) return null;
   try {
      const q = query(collection(db, "events"), where("userRef", "==", userId));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => {
         return { ...doc.data(), uid: doc.id };
      });
      return data;
   } catch (error) {
      console.error("Error fetching user", error.message);
   }
};

export const createEventDocument = async (event) => {
   if (!event) return;
   console.log(event);
   try {
      console.log("ini push");
      await addDoc(collection(db, "events"), {
         id: event.id,
         uid: event.uid,
         title: event.title,
         description: event.description,
         times: event.times,
         day: event.day,
         label: event.label,
         date: event.date,
         userRef: event.userRef,
      });
   } catch (error) {
      console.log(error.message);
   }
};

export const updateEventDocument = async (event) => {
   if (!event) return;
   try {
      await updateDoc(doc(db, "events", event.uid), {
         id: event.id,
         title: event.title,
         description: event.description,
         times: event.times,
         day: event.day,
         label: event.label,
         date: event.date,
         userRef: event.userRef,
      });
   } catch (error) {
      console.log(error.message);
   }
};

export const deleteEventDocument = async (eventUid) => {
   console.log("ini delete");
   if (!eventUid) return;
   try {
      await deleteDoc(doc(db, "events", eventUid));
   } catch (error) {
      console.log(error.message);
   }
};
