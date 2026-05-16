// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCvZLp9cGhLl0IYtH8cas-3uMDHItlqFQs',
  authDomain: 'patchnova-1cbb1.firebaseapp.com',
  projectId: 'patchnova-1cbb1',
  storageBucket: 'patchnova-1cbb1.firebasestorage.app',
  messagingSenderId: '221393582446',
  appId: '1:221393582446:web:8545adfac6290d7233697f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;
