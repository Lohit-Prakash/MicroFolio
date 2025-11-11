import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGYhzC5zOjQLcKhZCqbK-cXeXOZW9AU6M",
  authDomain: "myportfolio-50a76.firebaseapp.com",
  projectId: "myportfolio-50a76",
  storageBucket: "myportfolio-50a76.firebasestorage.app",
  messagingSenderId: "167882375801",
  appId: "1:167882375801:web:1abc55cb62547e82dbcaa8",
  measurementId: "G-Y9JKRH3EJZ"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);


