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

    if (!email || !password) {
      setError("Please enter an email and password.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account created successfully!");
      onCreateAccountSuccess(userCredential.user);
    } catch (error) {
      console.log("Create account error:", error);
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "50px auto",
        textAlign: "center",
        padding: "20px"
      }}
    >
      <h2>Rowan Budget Companion - A student centered budgeting tool</h2>
      <p>Create Account</p>

      <form onSubmit={handleCreateAccount}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            margin: "10px 0",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #999",
            boxSizing: "border-box"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            margin: "10px 0",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #999",
            boxSizing: "border-box"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            backgroundColor: "#1a1a1a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Create Account
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Already have an account?{" "}
        <button
          type="button"
          onClick={onBackToLogin}
          style={{
            padding: "8px 14px",
            backgroundColor: "#1a1a1a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Back to Login
        </button>
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CreateAccount;