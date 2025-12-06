import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbddYCH65EHCTRluFHe4FOE6J5z9yBLxw",
  authDomain: "jogo-arquivo-morto.firebaseapp.com",
  projectId: "jogo-arquivo-morto",
  storageBucket: "jogo-arquivo-morto.firebasestorage.app",
  messagingSenderId: "24019872660",
  appId: "1:24019872660:web:bda2b9dacc0530f48b7d81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
