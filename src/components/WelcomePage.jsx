// src/components/WelcomePage.jsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Button from './Button';

function WelcomePage({ user }) {
  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Firebase signOut returns a promise, so we use await
      await signOut(auth);
      // Note: We don't need to navigate manually here because
      // the onAuthStateChanged listener in App.jsx will detect
      // the logout and update the user state, which will trigger
      // the route protection to redirect to login
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Welcome {user}!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          You have successfully logged in.
        </p>
        
        {/* Custom logout button styling */}
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;