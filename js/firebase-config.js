// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Function to save beta tester data to Firestore
export async function saveBetaTester(firstName, surname, email) {
  try {
    const docRef = await addDoc(collection(db, "beta-testers"), {
      firstName: firstName,
      surname: surname,
      email: email,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent
    });
    console.log("Beta tester saved with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error saving beta tester: ", error);
    return false;
  }
}

export { analytics, db };