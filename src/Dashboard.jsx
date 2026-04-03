import { useState } from "react";
import RowanResources from "./RowanResources";

function Dashboard({ user }) {
  const [viewMode, setViewMode] = useState("monthly");
  const [activeTab, setActiveTab] = useState("dashboard");

  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [semesterIncome, setSemesterIncome] = useState("");

  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [semesterExpenses, setSemesterExpenses] = useState([]);

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedView, setSelectedView] = useState("monthly");

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
          <button
            className={activeTab === "dashboard" ? "nav-item active" : "nav-item"}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={activeTab === "whatif" ? "nav-item active" : "nav-item"}
            onClick={() => setActiveTab("whatif")}
          >
            What-if?
          </button>

          <button
            className={activeTab === "resources" ? "nav-item active" : "nav-item"}
            onClick={() => setActiveTab("resources")}
          >
            Rowan Resources
          </button>

          <button
            className={activeTab === "settings" ? "nav-item active" : "nav-item"}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        {/* DASHBOARD VIEW */}
        {activeTab === "dashboard" && (
          <>
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
                <h3>Income</h3>
                <p>${activeIncome.toLocaleString()}</p>
              </div>

              <div className="summary-card">
                <h3>Expenses</h3>
                <p>${totalExpenses.toLocaleString()}</p>
              </div>

              <div className="summary-card">
                <h3>Net</h3>
                <p>${net.toLocaleString()}</p>
              </div>
            </section>

            <section className="chart-card">
              <h2>Expense Breakdown</h2>

              <div className="chart-content">
                <div className="fake-chart" style={chartStyle}></div>

                <div className="chart-labels">
                  {activeExpenses.length === 0 ? (
                    <p>No expenses added yet.</p>
                  ) : (
                    activeExpenses.map((expense, index) => {
                      const percentage = ((expense.amount / totalExpenses) * 100).toFixed(1);

                      return (
                        <div key={index} className="chart-label-item">
                          <span>{expense.name}</span>
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
          </>
        )}

        {/* RESOURCES TAB */}
        {activeTab === "resources" && <RowanResources />}

        {/* OTHER TABS */}
        {activeTab === "whatif" && <div className="chart-card">What-if coming soon</div>}
        {activeTab === "settings" && <div className="chart-card">Settings coming soon</div>}
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