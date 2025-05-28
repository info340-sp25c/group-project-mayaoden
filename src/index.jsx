// index.jsx - Updated with Firebase Auth
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCu-s9BnGxNcMZd5F2DXecJbL4MTQ886nE",
  authDomain: "group-project-mayaoden.firebaseapp.com",
  databaseURL: "https://group-project-mayaoden-default-rtdb.firebaseio.com",
  projectId: "group-project-mayaoden",
  storageBucket: "group-project-mayaoden.firebasestorage.app",
  messagingSenderId: "254264394038",
  appId: "1:254264394038:web:17fa6a88f046bd993bf397",
  measurementId: "G-CWVM4CFJM9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)