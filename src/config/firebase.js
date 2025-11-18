import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBXHUAnCUY_cW_1X9qUzR9gpnQRTE7Vbn4",
  authDomain: "fabianosf-6f6c5.firebaseapp.com",
  projectId: "fabianosf-6f6c5",
  storageBucket: "fabianosf-6f6c5.firebasestorage.app",
  messagingSenderId: "995484382681",
  appId: "1:995484382681:web:e8170f18cbf3c79d0f95c8",
  measurementId: "G-8X821KD58V"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
export const db = getFirestore(app);

