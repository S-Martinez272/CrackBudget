import { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [showForgot, setShowForgot] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div>
      {loggedInUser ? (
        <Dashboard user={loggedInUser} />
      ) : showForgot ? (
        <ForgotPassword onBackToLogin={() => setShowForgot(false)} />
      ) : (
        <Login
          onLoginSuccess={(user) => setLoggedInUser(user)}
          onForgotPassword={() => setShowForgot(true)}
        />
      )}
    </div>
  );
}

export default App;