import React from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

function Settings({ onLogout }) {
  
  const handleLogout = async () => {
    try {
     
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");

      // logs user out of Firebase
      await signOut(auth);
      
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <div className="settings-content">
      <h2>Settings</h2>
      <p>Manage your account details below</p>
      <button
        className="logout-btn"
        onClick={handleLogout}
        style={{
          backgroundColor: "#d9534f",
          color: "white",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Settings;