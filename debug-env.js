// Debug script for environment variables
console.log('Environment variables check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('FIREBASE_API_KEY:', process.env.FIREBASE_API_KEY);
console.log('FIREBASE_AUTH_DOMAIN:', process.env.FIREBASE_AUTH_DOMAIN);
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('FIREBASE_STORAGE_BUCKET:', process.env.FIREBASE_STORAGE_BUCKET);
console.log('FIREBASE_MESSAGING_SENDER_ID:', process.env.FIREBASE_MESSAGING_SENDER_ID);
console.log('FIREBASE_APP_ID:', process.env.FIREBASE_APP_ID);
console.log('FIREBASE_MEASUREMENT_ID:', process.env.FIREBASE_MEASUREMENT_ID);

// Print all environment variables
console.log('\nAll environment variables:');
console.log(JSON.stringify(process.env, null, 2));