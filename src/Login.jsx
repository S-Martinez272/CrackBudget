import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login({ onLoginSuccess, onForgotPassword }) { //added this so App can switch us to the dashboard after login :P

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); //logs user in and grabs their firebase account info

      alert("Login successful!");

      onLoginSuccess(userCredential.user);

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Rowan Budget Companion</h1>
        <p className="login-subtitle">A student centered budgeting tool</p>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <button
          type="button"
          onClick={onForgotPassword}
          className="forgot-button"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}

export default Login;