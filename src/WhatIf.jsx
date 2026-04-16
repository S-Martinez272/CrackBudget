import { useState } from "react";

function WhatIf() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [change, setChange] = useState(0);
  const [timeframe, setTimeframe] = useState("monthly");

  const currentBalance = income - expenses;
  const projectedBalance = currentBalance + Number(change);

  return (
    <div>
      <h2>What If Simulator</h2>

      <label>Income:</label>
      <input
        type="number"
        placeholder="Income"
        onChange={(e) => setIncome(Number(e.target.value))}
      />

      <label>Expenses:</label>
      <input
        type="number"
        placeholder="Expenses"
        onChange={(e) => setExpenses(Number(e.target.value))}
      />

      <label>What If Change:</label>
      <input
        type="number"
        placeholder="What if change (+ or -)"
        onChange={(e) => setChange(Number(e.target.value))}
      />

      <label>Timeframe:</label>
      <select onChange={(e) => setTimeframe(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option> {/* ✅ FIXED */}
      </select>

      <h3>Current Balance: ${currentBalance}</h3>
      <h3>Projected Balance: ${projectedBalance}</h3>
      <p>Timeframe: {timeframe}</p>
    </div>
  );
}

export default WhatIf;
