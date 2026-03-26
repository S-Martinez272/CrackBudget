// App.jsx
// Authors: Sophia, Ellie, Scout

import { useState } from "react";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showForgot, setShowForgot] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  if (loggedInUser) {
    return <Dashboard user={loggedInUser} />;
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