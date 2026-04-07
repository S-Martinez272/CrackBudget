import { useState } from "react";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

function CreateAccount({ onCreateAccountSuccess, onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date()
      });

      alert("Account created successfully!");

      onCreateAccountSuccess(user);

    } catch (error) {
      setError(error.message);
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

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CreateAccount;