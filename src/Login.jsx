//Login.js
//authent. users login process w/ firebase

//forgot password part is not great....need to fix
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
    <div>
      <h1>Rowan Budget Companion</h1>
      <p>A student centered budgeting tool</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button type="submit">Login</button>
      </form>

      <p>
        <button type="button" onClick={onForgotPassword}>
          Forgot Password?
        </button>
      </p>
      
      <p>
        {" Don't have an account? "}
         <button type="button" onClick={onGoToCreateAccount}>
          Create Account
        </button>
      </p>
    </div>
  );
}

export default Login;