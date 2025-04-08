// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import LoginPage from './components/LoginPage';
import WelcomePage from './components/WelcomePage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get the user document from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          // Set the username from Firestore
          setUser(userDoc.data().username);
        } else {
          // Fallback to email if no username exists
          setUser(currentUser.email.split('@')[0]);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleLogin = (username) => {
    setUser(username);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen min-w-screen bg-gray-100">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Navigate to="/welcome" /> : <LoginPage onLogin={handleLogin} />} 
          />
          <Route 
            path="/welcome" 
            element={user ? <WelcomePage user={user} /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;