// Firebase web configuration for TamimHost.free.
// This web config is intended to be public; protect data with Firebase Security Rules.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
// Firebase Storage is not initialized because the project is not on a billing-enabled plan.

const firebaseConfig = {
  apiKey: "AIzaSyDF7hKz-UGcgIoM4z_1QUN4F6GGSR_jp28",
  authDomain: "tamimhost-free-2c21d.firebaseapp.com",
  projectId: "tamimhost-free-2c21d",
  storageBucket: "tamimhost-free-2c21d.firebasestorage.app",
  messagingSenderId: "375256941423",
  appId: "1:375256941423:web:97824dfee4fca7b1cc9e9a",
  measurementId: "G-E53KG8MER9"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
