import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBX4Ohc17a-HUKAaOtWCAZSz7DJF4rCVks",
  authDomain: "ai-smart-987db.firebaseapp.com",
  projectId: "ai-smart-987db",
  storageBucket: "ai-smart-987db.firebasestorage.app",
  messagingSenderId: "350442779731",
  appId: "1:350442779731:web:3821926e65265da8d1c2a6",
  measurementId: "G-XRGZMQ8655"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };