function App() {
  const [showForgot, setShowForgot] = useState(false);

  return (
    <div>
      <h1>Rowan Budget Companion</h1>
      <p>A student centric budgeting tool!</p>

      {showForgot ? (
        <ForgotPassword />
      ) : (
        <Login onForgotPassword={() => setShowForgot(true)} />
      )}
    </div>
  );
}

export default App;
