// App.jsx
// Authors: Sophia, Ellie, Scout

import { useState } from "react";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [showForgot, setShowForgot] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(true);

  return (
    <div>
      {loggedInUser ? (
        <Dashboard user={loggedInUser} />
      ) : showCreateAccount ? (
        <CreateAccount onCreateAccountSuccess={(user) => setLoggedInUser(user)} onBackToLogin={() => setShowCreateAccount(true)} />
      ) : showForgot ? (
        <ForgotPassword onBackToLogin={() => setShowForgot(false)} />
      ) : (
        <Login
          onLoginSuccess={(user) => setLoggedInUser(user)}
          onForgotPassword={() => setShowForgot(true)}
          onGoToCreateAccount={() => setShowCreateAccount(true)}
        />
      )}
    </div>
  );
}

export default App;