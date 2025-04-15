import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importar Firestore
import { getAuth } from "firebase/auth"; // Importar Firebase Authentication

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2NF_MIxPPHdKzIbkhWR3Vuv5L0jCFWzs",
  authDomain: "actas-67e23.firebaseapp.com",
  projectId: "actas-67e23",
  storageBucket: "actas-67e23.firebasestorage.app",
  messagingSenderId: "174158253284",
  appId: "1:174158253284:web:9375e4891a002103c970f1",
  measurementId: "G-MXBLH35HX4"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa los servicios de Firestore y Firebase Authentication
const db = getFirestore(app);
const auth = getAuth(app);

// Exporta la app, Firestore y Firebase Authentication para usarlos en otros archivos
export { app, db, auth };
