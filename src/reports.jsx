import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

function Reports({ user, onSelectReport }) {
  const [reports, setReports] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const reportsRef = collection(db, "users", user.uid, "reports");
        const reportsQuery = query(reportsRef, orderBy("createdAt", "desc"));
        const reportsSnapshot = await getDocs(reportsQuery);

        const reportList = reportsSnapshot.docs.map((doc) => ({
          id: doc.id,
          type: "report",
          ...doc.data(),
        }));

        const scenariosRef = collection(db, "users", user.uid, "whatIfScenarios");
        const scenariosQuery = query(scenariosRef, orderBy("createdAt", "desc"));
        const scenariosSnapshot = await getDocs(scenariosQuery);

        const scenarioList = scenariosSnapshot.docs.map((doc) => ({
          id: doc.id,
          type: "scenario",
          ...doc.data(),
        }));

        setReports(reportList);
        setScenarios(scenarioList);
      } catch (error) {
        console.log("Error loading reports:", error);
        alert("Could not load reports.");
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [user]);

  if (!user) {
    return (
      <div className="input-card">
        <h3>Reports</h3>
        <p>Please sign in to view saved reports.</p>
      </div>
    );
  }

  return (
    <div className="reports-page">
      <div className="dashboard-topbar">
        <div className="dashboard-header">
          <h1>Saved Reports</h1>
          <p>Review your dashboard reports and saved What If scenarios.</p>
        </div>
      </div>

      <div className="input-card">
        <h3>Dashboard Reports</h3>

        {loading ? (
          <p>Loading reports...</p>
        ) : reports.length === 0 ? (
          <p>No saved dashboard reports yet.</p>
        ) : (
          <table className="reports-table">
            <thead>
              <tr>
                <th>View</th>
                <th>Income</th>
                <th>Expenses</th>
                <th>Net</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.viewMode}</td>
                  <td>${Number(report.income || 0).toLocaleString()}</td>
                  <td>${Number(report.totalExpenses || 0).toLocaleString()}</td>
                  <td>${Number(report.net || 0).toLocaleString()}</td>
                  <td>
                    {report.createdAt?.toDate
                      ? report.createdAt.toDate().toLocaleString()
                      : "No date"}
                  </td>
                  <td>
                    <button
                      className="save-btn"
                      onClick={() => onSelectReport(report)}
                    >
                      Use in What If
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="input-card" style={{ marginTop: "20px" }}>
        <h3>What If Scenarios</h3>

        {loading ? (
          <p>Loading scenarios...</p>
        ) : scenarios.length === 0 ? (
          <p>No saved scenarios yet.</p>
        ) : (
          <table className="reports-table">
            <thead>
              <tr>
                <th>Scenario Name</th>
                <th>Based On</th>
                <th>Projected Income</th>
                <th>Projected Expenses</th>
                <th>Projected Net</th>
                <th>Net Difference</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {scenarios.map((scenario) => (
                <tr key={scenario.id}>
                  <td>{scenario.scenarioName || "Unnamed Scenario"}</td>
                  <td>{scenario.sourceViewMode || "No view"}</td>
                  <td>${Number(scenario.projectedIncome || 0).toLocaleString()}</td>
                  <td>${Number(scenario.projectedExpenses || 0).toLocaleString()}</td>
                  <td>${Number(scenario.projectedNet || 0).toLocaleString()}</td>
                  <td>${Number(scenario.netDifference || 0).toLocaleString()}</td>
                  <td>
                    {scenario.createdAt?.toDate
                      ? scenario.createdAt.toDate().toLocaleString()
                      : "No date"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Reports;