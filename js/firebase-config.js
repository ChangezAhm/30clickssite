// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBZgg0wTrQcSVkYlDPDPBAtSCRK1aIV_s",
  authDomain: "clicks-site.firebaseapp.com",
  projectId: "clicks-site",
  storageBucket: "clicks-site.firebasestorage.app",
  messagingSenderId: "737273956105",
  appId: "1:737273956105:web:6ad31d99fe9199c8ec35d8",
  measurementId: "G-3FGR95YLZ9"
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