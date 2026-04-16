import { useEffect, useMemo, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

function WhatIf({ user, selectedReport }) {
  // all saved reports for dropdown use
  const [reports, setReports] = useState([]);

  // selected report id inside this tab
  const [selectedReportId, setSelectedReportId] = useState("");

  // scenario form values
  const [scenarioName, setScenarioName] = useState("");
  const [incomeChange, setIncomeChange] = useState("");
  const [expenseChange, setExpenseChange] = useState("");
  const [notes, setNotes] = useState("");

  const [loadingReports, setLoadingReports] = useState(true);
  const [savingScenario, setSavingScenario] = useState(false);

  // load reports from firestore
  useEffect(() => {
    const loadReports = async () => {
      if (!user) {
        setLoadingReports(false);
        return;
      }

      try {
        const reportsRef = collection(db, "users", user.uid, "reports");
        const reportsQuery = query(reportsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(reportsQuery);

        const reportList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(reportList);

        if (selectedReport?.id) {
          setSelectedReportId(selectedReport.id);
        } else if (reportList.length > 0) {
          setSelectedReportId(reportList[0].id);
        }
      } catch (error) {
        console.log("Error loading reports:", error);
        alert("Could not load saved reports.");
      } finally {
        setLoadingReports(false);
      }
    };

    loadReports();
  }, [user, selectedReport]);

  // if a report gets passed from reports tab, use it automatically
  useEffect(() => {
    if (selectedReport?.id) {
      setSelectedReportId(selectedReport.id);
    }
  }, [selectedReport]);

  const activeReport = useMemo(() => {
    if (selectedReport && selectedReport.id === selectedReportId) {
      return selectedReport;
    }

    return reports.find((report) => report.id === selectedReportId) || null;
  }, [reports, selectedReportId, selectedReport]);

  const baseIncome = Number(activeReport?.income || 0);
  const baseExpenses = Number(activeReport?.totalExpenses || 0);
  const baseNet = Number(activeReport?.net || 0);

  const parsedIncomeChange = Number(incomeChange || 0);
  const parsedExpenseChange = Number(expenseChange || 0);

  const projectedIncome = baseIncome + parsedIncomeChange;
  const projectedExpenses = baseExpenses + parsedExpenseChange;
  const projectedNet = projectedIncome - projectedExpenses;
  const netDifference = projectedNet - baseNet;

  const handleSaveScenario = async () => {
    if (!user) {
      alert("Sign in to save your scenario, but you can still use the simulator.");
      return;
    }

    if (!activeReport) {
      alert("Please select a saved report first.");
      return;
    }

    if (!scenarioName.trim()) {
      alert("Please give your scenario a name.");
      return;
    }

    setSavingScenario(true);

    try {
      const scenariosRef = collection(db, "users", user.uid, "whatIfScenarios");

      await addDoc(scenariosRef, {
        scenarioName: scenarioName.trim(),
        notes: notes.trim(),
        sourceReportId: activeReport.id,
        sourceViewMode: activeReport.viewMode || "monthly",
        baseIncome,
        baseExpenses,
        baseNet,
        incomeChange: parsedIncomeChange,
        expenseChange: parsedExpenseChange,
        projectedIncome,
        projectedExpenses,
        projectedNet,
        netDifference,
        createdAt: Timestamp.now(),
      });

      alert("Scenario saved successfully!");

      setScenarioName("");
      setIncomeChange("");
      setExpenseChange("");
      setNotes("");
    } catch (error) {
      console.log("Error saving scenario:", error);
      alert("Could not save scenario.");
    } finally {
      setSavingScenario(false);
    }
  };

  const formatMoney = (value) => {
    return `$${Number(value).toLocaleString()}`;
  };

  return (
    <div className="whatif-page">
      <div className="dashboard-topbar">
        <div className="dashboard-header">
          <h1>What If Simulator</h1>
          <p>Test changes using one of your saved reports as a baseline.</p>
        </div>
      </div>

      <section className="input-section">
        <div className="input-card">
          <h3>Choose a Saved Report</h3>

          {loadingReports ? (
            <p>Loading saved reports...</p>
          ) : reports.length === 0 ? (
            <p>No saved reports yet. Save one from the dashboard first.</p>
          ) : (
            <>
              <label className="input-label">Saved Report</label>
              <select
                value={selectedReportId}
                onChange={(e) => setSelectedReportId(e.target.value)}
                className="dashboard-input"
              >
                {reports.map((report) => (
                  <option key={report.id} value={report.id}>
                    {report.viewMode} report -{" "}
                    {report.createdAt?.toDate
                      ? report.createdAt.toDate().toLocaleString()
                      : "No date"}
                  </option>
                ))}
              </select>

              <div className="whatif-baseline">
                <p><strong>Base Income:</strong> {formatMoney(baseIncome)}</p>
                <p><strong>Base Expenses:</strong> {formatMoney(baseExpenses)}</p>
                <p><strong>Base Net:</strong> {formatMoney(baseNet)}</p>
              </div>
            </>
          )}
        </div>

        <div className="input-card">
          <h3>Build Your Scenario</h3>

          <label className="input-label">Scenario Name</label>
          <input
            type="text"
            placeholder="Ex. Working extra hours"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            className="dashboard-input"
          />

          <label className="input-label">Income Change</label>
          <input
            type="number"
            placeholder="Ex. 200"
            value={incomeChange}
            onChange={(e) => setIncomeChange(e.target.value)}
            className="dashboard-input"
          />

          <label className="input-label">Expense Change</label>
          <input
            type="number"
            placeholder="Ex. 75"
            value={expenseChange}
            onChange={(e) => setExpenseChange(e.target.value)}
            className="dashboard-input"
          />

          <label className="input-label">Notes</label>
          <textarea
            placeholder="Explain what change you are testing..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="dashboard-input"
            rows="4"
          />

          <button
            type="button"
            className="save-btn"
            onClick={handleSaveScenario}
            disabled={savingScenario || !activeReport}
          >
            {savingScenario ? "Saving..." : "Save Scenario"}
          </button>
        </div>
      </section>

      <section className="summary-grid">
        <div className="summary-card">
          <h3>Projected Income</h3>
          <p>{formatMoney(projectedIncome)}</p>
        </div>

        <div className="summary-card">
          <h3>Projected Expenses</h3>
          <p>{formatMoney(projectedExpenses)}</p>
        </div>

        <div className="summary-card">
          <h3>Projected Net</h3>
          <p>{formatMoney(projectedNet)}</p>
        </div>
      </section>

      <section className="chart-card">
        <div className="chart-header">
          <h2>Scenario Summary</h2>
          <span>{activeReport?.viewMode || "No report selected"}</span>
        </div>

        <div className="chart-labels">
          <div className="chart-label-item">
            <span>Starting Net</span>
            <span>{formatMoney(baseNet)}</span>
          </div>

          <div className="chart-label-item">
            <span>Income Change</span>
            <span>{formatMoney(parsedIncomeChange)}</span>
          </div>

          <div className="chart-label-item">
            <span>Expense Change</span>
            <span>{formatMoney(parsedExpenseChange)}</span>
          </div>

          <div className="chart-label-item">
            <span>Net Difference</span>
            <span>{formatMoney(netDifference)}</span>
          </div>
        </div>
      </section>
    </div>
  );
}


export default WhatIf;