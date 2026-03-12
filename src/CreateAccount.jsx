// Create account section

import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function CreateAccount({ onCreateAccountSuccess, onBackToLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            alert("Account created successfully!");
            onCreateSuccess(userCredential.user);

        } catch (error) {

           alert(error.message);
        }
    };

  return (
    <div>
      <h2>Rowan Budget Companion - A student centered budgeting tool</h2>
      <p>Create Account</p>

      <form onSubmit={handleCreateAccount}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />


        <button type="submit">Create Account</button>
      </form>

      <p>
        {" Already have an account? "}
         <button type="button" onClick={onBackToLogin}>
          Back to Login
        </button>
      </p>
    </div>
  );
}

export default CreateAccount;