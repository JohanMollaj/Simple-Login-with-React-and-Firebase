import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import InputField from './InputField';
import Button from './Button';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      let userCredential;
      
      if (isSignUp) {
        // Create a new user
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Store the username in Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: username,
          email: email,
          createdAt: new Date()
        });
      } else {
        // Sign in existing user
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      
      // Pass the username to the parent component
      onLogin(username);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h1>
        
        {error && (
          <div className="mb-4 text-sm text-center text-red-600">
            {error}
          </div>
        )}
        
        <form onSubmit={handleAuth}>
          <InputField
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          
          <Button type="submit">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <a
            className="text-sm text-blue-600 cursor-pointer hover:text-blue-800"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Already have an account? Log in' : 'Need an account? Sign up'}
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;