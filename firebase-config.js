// Firebase Configuration
// Este arquivo carrega a configuração do Firebase de variáveis de ambiente
// Para produção (Netlify), as variáveis são injetadas durante o build

const firebaseConfig = {
    apiKey: window.ENV?.FIREBASE_API_KEY || "AIzaSyAbddYCH65EHCTRluFHe4FOE6J5z9yBLxw",
    authDomain: window.ENV?.FIREBASE_AUTH_DOMAIN || "jogo-arquivo-morto.firebaseapp.com",
    projectId: window.ENV?.FIREBASE_PROJECT_ID || "jogo-arquivo-morto",
    storageBucket: window.ENV?.FIREBASE_STORAGE_BUCKET || "jogo-arquivo-morto.firebasestorage.app",
    messagingSenderId: window.ENV?.FIREBASE_MESSAGING_SENDER_ID || "24019872660",
    appId: window.ENV?.FIREBASE_APP_ID || "1:24019872660:web:bda2b9dacc0530f48b7d81"
};

export { firebaseConfig };
