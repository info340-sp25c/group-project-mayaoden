// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../index.jsx';
import { getUserData, updateUserProfile } from '../firebase/Database';
import { ref, onValue } from 'firebase/database';
import { db } from '../index.jsx';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let userListener = null;
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // Clean up previous listener if exists
      if (userListener) {
        userListener();
      }
      
      if (user) {
        // Initial load of user data
        try {
          const dbUserData = await getUserData(user.uid);
          setUserData(dbUserData);
          
          // Set up real-time listener for user data
          const userRef = ref(db, `users/${user.uid}`);
          userListener = onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
              setUserData(snapshot.val());
            }
          });
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    // Return cleanup function that removes both listeners
    return () => {
      if (userListener) {
        userListener();
      }
      unsubscribe();
    };
  }, []);

  const signUp = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
        
        // Create user profile in database
        await updateUserProfile(userCredential.user.uid, {
          name: displayName,
          email: email,
          points: 0
        });
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Create or update user profile in database
      await updateUserProfile(result.user.uid, {
        name: result.user.displayName || 'Anonymous',
        email: result.user.email,
        points: 0,
        photoURL: result.user.photoURL
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    currentUser,
    userData,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};