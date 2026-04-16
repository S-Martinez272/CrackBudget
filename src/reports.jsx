import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function Reports({ user }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      if (!user) return;

      try {
        const reportsRef = collection(db, "users", user.uid, "reports");
        const snapshot = await getDocs(reportsRef);

        const reportList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(reportList);
      } catch (error) {
        console.log("Error loading reports:", error);
      }
    };

    loadReports();
  }, [user]);

  return (
    <div className="chart-card">
      <h2>Saved Reports</h2>

      {reports.length === 0 ? (
        <p>No reports saved yet.</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>View</th>
              <th>Income</th>
              <th>Expenses</th>
              <th>Net</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.viewMode}</td>
                <td>${report.income}</td>
                <td>${report.totalExpenses}</td>
                <td>${report.net}</td>
                <td>
                  {report.expenses && report.expenses.length > 0 ? (
                    report.expenses.map((expense, index) => (
                      <div key={index}>
                        {expense.name}: ${expense.amount}
                      </div>
                    ))
                  ) : (
                    <span>No categories</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Reports;