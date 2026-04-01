import { useState } from "react";

function Dashboard({ user }) {
  const [viewMode, setViewMode] = useState("monthly");

  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [semesterIncome, setSemesterIncome] = useState("");

  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [semesterExpenses, setSemesterExpenses] = useState([]);

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedView, setSelectedView] = useState("monthly");

  const [InfoTab, setInfoTab] = useState("dashboard");

  const activeExpenses =
    viewMode === "monthly" ? monthlyExpenses : semesterExpenses;

  const activeIncome =
    viewMode === "monthly"
      ? Number(monthlyIncome || 0)
      : Number(semesterIncome || 0);

  const totalExpenses = activeExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const net = activeIncome - totalExpenses;

  const chartStyle =
    activeExpenses.length > 0
      ? {
          background: `conic-gradient(${buildChartSegments(
            activeExpenses,
            totalExpenses
          )})`,
        }
      : {
          background: "#d9ded6",
        };

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!category.trim() || !amount) {
      alert("Please enter both a category and amount.");
      return;
    }

    const newExpense = {
      name: category,
      amount: Number(amount),
      color: getColor(category),
    };

    if (selectedView === "monthly") {
      setMonthlyExpenses([...monthlyExpenses, newExpense]);
    } else {
      setSemesterExpenses([...semesterExpenses, newExpense]);
    }

    setCategory("");
    setAmount("");
  };

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="brand-section">
          <h2 className="brand-name">Rowan Budget Companion</h2>
          <p className="brand-email">{user?.email || "No user signed in"}</p>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">Dashboard</button>
          <button className="nav-item">Budget</button>
          <button className="nav-item">Reports</button>
          <button className="nav-item">Settings</button>
          <button className="nav-item">All Accounts</button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <h1>Budget Summary</h1>
            <p>Track your budget by month or semester.</p>
          </div>

          <div className="toggle-group">
            <button
              className={viewMode === "monthly" ? "toggle-btn active-toggle" : "toggle-btn"}
              onClick={() => setViewMode("monthly")}
            >
              Monthly
            </button>
            <button
              className={viewMode === "semester" ? "toggle-btn active-toggle" : "toggle-btn"}
              onClick={() => setViewMode("semester")}
            >
              Semester
            </button>
          </div>
        </div>

        <section className="input-section">
          <div className="input-card">
            <h3>Set Income</h3>

            <label className="input-label">Monthly Income</label>
            <input
              type="number"
              placeholder="Enter monthly income"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="dashboard-input"
            />

            <label className="input-label">Semester Income</label>
            <input
              type="number"
              placeholder="Enter semester income"
              value={semesterIncome}
              onChange={(e) => setSemesterIncome(e.target.value)}
              className="dashboard-input"
            />
          </div>

          <div className="input-card">
            <h3>Add Expense</h3>

            <form onSubmit={handleAddExpense} className="expense-form">
              <label className="input-label">Apply To</label>
              <select
                value={selectedView}
                onChange={(e) => setSelectedView(e.target.value)}
                className="dashboard-input"
              >
                <option value="monthly">Monthly</option>
                <option value="semester">Semester</option>
              </select>

              <label className="input-label">Expense Category</label>
              <input
                type="text"
                placeholder="Ex. Groceries"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="dashboard-input"
              />

              <label className="input-label">Amount</label>
              <input
                type="number"
                placeholder="Ex. 120"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="dashboard-input"
              />

              <button type="submit" className="save-btn">
                Add Expense
              </button>
            </form>
          </div>
        </section>

        <section className="summary-grid">
          <div className="summary-card">
            <div className="card-header">
              <h3>Income</h3>
              <div
                  className="info-tab"
                  onMouseEnter={() => setInfoTab('income')}
                  onMouseLeave={() => setShowInfoTab(null)}
                  >
              <button className="info-btn" >i</button>
              {InfoTab === 'income' && (
                <div className="info-popup">Total income for the selected view</div>
              )}
          /</div>
          </div>
            <p>${activeIncome.toLocaleString()}</p>
          </div>

          <div className="summary-card">
            <div className="card-header">
              <h3>Expenses</h3>
              <div
                  className="info-tab"
                  onMouseEnter={() => setInfoTab('expenses')}
                  onMouseLeave={() => setShowInfoTab(null)}
                  >
              <button className="info-btn" >i</button>
              {InfoTab === 'expenses' && (
                <div className="info-popup">Total expenses for selected view</div>
              )}
          /</div>
          </div>
            <p>${totalExpenses.toLocaleString()}</p>
          </div>

          <div className="summary-card">
            <div className="card-header">
              <h3>Net</h3>
              <div
                  className="info-tab"
                  onMouseEnter={() => setInfoTab('net')}
                  onMouseLeave={() => setShowInfoTab(null)}
                  >
              <button className="info-btn" >i</button>
              {InfoTab === 'net' && (
                <div className="info-popup">Net = Income - Expenses</div>
              )}
          /</div>
          </div>
            <p>${net.toLocaleString()}</p>
          </div>
        </section>

        <section className="chart-card">
          <div className="chart-header">
            <h2>Expense Breakdown</h2>
            <span>{viewMode === "monthly" ? "Monthly View" : "Semester View"}</span>
          </div>

          <div className="chart-content">
            <div className="fake-chart" style={chartStyle}>
              <div className="chart-hole">
                <span>
                  {totalExpenses > 0
                    ? `$${totalExpenses.toLocaleString()}`
                    : "No Data"}
                </span>
              </div>
            </div>

            <div className="chart-labels">
              {activeExpenses.length === 0 ? (
                <p>No expenses added yet.</p>
              ) : (
                activeExpenses.map((expense, index) => {
                  const percentage = ((expense.amount / totalExpenses) * 100).toFixed(1);

                  return (
                    <div key={index} className="chart-label-item">
                      <div className="label-left">
                        <span
                          className="color-dot"
                          style={{ backgroundColor: expense.color }}
                        ></span>
                        <span>{expense.name}</span>
                      </div>
                      <span>
                        ${expense.amount} ({percentage}%)
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function buildChartSegments(data, total) {
  let currentPercent = 0;

  return data
    .map((expense) => {
      const start = currentPercent;
      const piece = (expense.amount / total) * 100;
      const end = start + piece;
      currentPercent = end;
      return `${expense.color} ${start}% ${end}%`;
    })
    .join(", ");
}

function getColor(category) {
  const colors = [
    "#c97d3d",
    "#927700",
    "#ead7b1",
    "#6e9457",
    "#eed252",
    "#575757",
    "#4f7cac",
    "#b56576",
  ];

  let total = 0;
  for (let i = 0; i < category.length; i++) {
    total += category.charCodeAt(i);
  }

  return colors[total % colors.length];
}

export default Dashboard;