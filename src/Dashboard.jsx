function Dashboard({ user }) {
  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="brand-section">
          <h2 className="brand-name">Rowan Budget Companion</h2>
          <p className="brand-email">
            {user?.email ? user.email : "No user signed in"}
          </p>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">Dashboard</button>
          <button className="nav-item">Budget</button>
          <button className="nav-item">Reports</button>
          <button className="nav-item">All Accounts</button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome</h1>
          <p>Start entering your budget information to see your summary.</p>
        </div>

        <section className="summary-grid">
          <div className="summary-card empty-card">
            <h3>Total Budget</h3>
            <p>--</p>
            <span>Waiting for user input</span>
          </div>

          <div className="summary-card empty-card">
            <h3>Total Spent</h3>
            <p>--</p>
            <span>Waiting for user input</span>
          </div>

          <div className="summary-card empty-card">
            <h3>Remaining</h3>
            <p>--</p>
            <span>Waiting for user input</span>
          </div>
        </section>

        <section className="chart-card">
          <h2>Spending Breakdown</h2>

          <div className="empty-chart-state">
            <div className="empty-chart-circle"></div>
            <p>No spending data yet</p>
            <span>Once the user adds categories and expenses, the chart can appear here.</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;