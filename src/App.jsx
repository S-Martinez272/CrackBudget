// App.jsx
// Authors: Sophia, Ellie, Scout

import { useState } from "react";
import RowanResources from "./RowanResources";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Dashboard";
import "./App.css";


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showForgot, setShowForgot] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [onLogout, setOnLogout] = useState(null);
  
  const [currentview, setCurrentView] = useState("login");
  const handleLoginSuccess = () => { setCurrentView("dashboard"); };
  const handleLogout = () => { setCurrentView("login"); };



  if (loggedInUser) {
    return <Dashboard user={loggedInUser} onLogout={() => setLoggedInUser(null)} />;
  }

  if (showCreateAccount) {
    return (
      <CreateAccount
        onCreateAccountSuccess={setLoggedInUser}
        onBackToLogin={() => setShowCreateAccount(false)}
      />
    );
  }

  if (showForgot) {
    return <ForgotPassword onBackToLogin={() => setShowForgot(false)} />;
  }

  return (
    <Login
      onLoginSuccess={setLoggedInUser}
      onForgotPassword={() => setShowForgot(true)}
      onGoToCreateAccount={() => setShowCreateAccount(true)}
    />
  );
}

export default App;