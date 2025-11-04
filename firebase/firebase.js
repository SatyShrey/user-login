// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcw2jVtwdbwRhvAePfDbzBJNFNZZaR5MI",
  authDomain: "goldywebzone.firebaseapp.com",
  databaseURL: "https://goldywebzone-default-rtdb.firebaseio.com",
  projectId: "goldywebzone",
  storageBucket: "goldywebzone.firebasestorage.app",
  messagingSenderId: "462971610645",
  appId: "1:462971610645:web:6614c1f851cb6ed901101c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const saveData = async (uid,folder, data) => {
  await setDoc(doc(db, folder, uid), data, { merge: true });
};

export const retriveData = async (uid,folder) => {
  const docSnap = await getDoc(doc(db, folder, uid));
  return docSnap.exists() ? docSnap.data() : null;
};

export const googleProvider = new GoogleAuthProvider();
