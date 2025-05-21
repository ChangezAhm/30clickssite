// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Verify Firebase configuration
const validateFirebaseConfig = () => {
  const requiredEnvVars = [
    'FIREBASE_API_KEY',
    'FIREBASE_AUTH_DOMAIN',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_STORAGE_BUCKET',
    'FIREBASE_MESSAGING_SENDER_ID',
    'FIREBASE_APP_ID'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => 
    !process.env[varName] || 
    process.env[varName].includes('your_') || 
    process.env[varName] === 'undefined'
  );
  
  if (missingVars.length > 0) {
    console.error(`Missing or invalid Firebase config: ${missingVars.join(', ')}`);
    return false;
  }
  
  return true;
};

// Fallback Firebase configuration in case environment variables aren't available
const fallbackConfig = {
  apiKey: "AIzaSyAGEoDh15_-FuOAD7Cwcni2iLHUOGcmrgM",
  authDomain: "clicks-site.firebaseapp.com",
  databaseURL: "https://clicks-site-default-rtdb.firebaseio.com",
  projectId: "clicks-site",
  storageBucket: "clicks-site.firebasestorage.app",
  messagingSenderId: "737273956105",
  appId: "1:737273956105:web:6ad31d99fe9199c8ec35d8",
  measurementId: "G-3FGR95YLZ9"
};

// Check environment variables availability
console.log("ENV Check - FIREBASE_API_KEY:", process.env.FIREBASE_API_KEY ? "Available" : "Missing");
console.log("ENV Check - FIREBASE_AUTH_DOMAIN:", process.env.FIREBASE_AUTH_DOMAIN ? "Available" : "Missing");

// Your web app's Firebase configuration - use environment variables if available, fallback if not
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || fallbackConfig.apiKey,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || fallbackConfig.authDomain,
  projectId: process.env.FIREBASE_PROJECT_ID || fallbackConfig.projectId,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || fallbackConfig.storageBucket,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || fallbackConfig.messagingSenderId,
  appId: process.env.FIREBASE_APP_ID || fallbackConfig.appId,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || fallbackConfig.measurementId,
  databaseURL: process.env.FIREBASE_DATABASE_URL || fallbackConfig.databaseURL
};

console.log("Firebase config loaded. Using Project ID:", firebaseConfig.projectId);

// Initialize Firebase
let app, analytics, db;

try {
  if (validateFirebaseConfig()) {
    app = initializeApp(firebaseConfig);
    
    // Initialize analytics only if supported
    isAnalyticsSupported().then(supported => {
      if (supported) {
        analytics = getAnalytics(app);
      } else {
        console.log("Firebase analytics is not supported in this environment");
      }
    });
    
    db = getFirestore(app);
    console.log("Firebase initialized successfully");
  } else {
    throw new Error("Invalid Firebase configuration");
  }
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
  // Set up fallback for saving data locally if Firebase fails
}

// Function to save beta tester data to Firestore
export async function saveBetaTester(firstName, surname, email) {
  if (!db) {
    console.error("Firebase not initialized, cannot save beta tester");
    // Save to localStorage as fallback
    saveToLocalStorage(firstName, surname, email);
    return false;
  }
  
  try {
    const docRef = await addDoc(collection(db, "beta-testers"), {
      firstName: firstName,
      surname: surname,
      email: email,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent
    });
    console.log("Beta tester saved with ID: ", docRef.id);
    
    // Also save to localStorage as backup
    saveToLocalStorage(firstName, surname, email);
    return true;
  } catch (error) {
    console.error("Error saving beta tester to Firestore: ", error);
    // Save to localStorage as fallback
    saveToLocalStorage(firstName, surname, email);
    return false;
  }
}

// Fallback function to save data to localStorage
function saveToLocalStorage(firstName, surname, email) {
  try {
    let betaTesters = [];
    const storedTesters = localStorage.getItem('30clicks_beta_testers');
    if (storedTesters) {
      betaTesters = JSON.parse(storedTesters);
    }
    
    betaTesters.push({
      firstName: firstName,
      surname: surname,
      email: email,
      timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('30clicks_beta_testers', JSON.stringify(betaTesters));
    console.log('Beta tester saved to localStorage as fallback');
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

export { analytics, db };