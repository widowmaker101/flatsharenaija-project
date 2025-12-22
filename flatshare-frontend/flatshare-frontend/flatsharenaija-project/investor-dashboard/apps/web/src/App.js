import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS, LineElement, BarElement, ArcElement,
  CategoryScale, LinearScale, PointElement, Legend, Tooltip
} from "chart.js";

ChartJS.register(LineElement, BarElement, ArcElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const api = "http://127.0.0.1:10001";

export default function App() {
  const [users, setUsers] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [geo, setGeo] = useState(null);
  const [ops, setOps] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${api}/metrics/users`).then(r => r.json()),
      fetch(`${api}/metrics/revenue`).then(r => r.json()),
      fetch(`${api}/metrics/geography`).then(r => r.json()),
      fetch(`${api}/metrics/ops`).then(r => r.json()),
    ]).then(([u, r, g, o]) => {
      setUsers(u); setRevenue(r); setGeo(g); setOps(o);
    });
  }, []);

  const usersData = users && {
    labels: users.months,
    datasets: [{ label: "New Signups", data: users.signups, borderColor: "#2563eb", backgroundColor: "rgba(37,99,235,0.2)" }]
  };

  const revenueData = revenue && {
    labels: revenue.months,
    datasets: [
      { label: "Free", data: revenue.free, backgroundColor: "#93c5fd" },
      { label: "Paid", data: revenue.paid, backgroundColor: "#60a5fa" },
      { label: "Premium", data: revenue.premium, backgroundColor: "#2563eb" },
    ]
  };

  const geoData = geo && {
    labels: geo.labels,
    datasets: [{ data: geo.values, backgroundColor: ["#2563eb","#10b981","#f59e0b","#ef4444","#8b5cf6"] }]
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: 24 }}>
      <h2>Investor Demo Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h4>User growth</h4>
          {usersData ? <Line data={usersData} /> : "Loading..."}
        </div>
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h4>Revenue breakdown</h4>
          {revenueData ? <Bar data={revenueData} options={{ responsive: true, plugins: { legend: { position: "bottom" } }, scales: { x: { stacked: true }, y: { stacked: true } } }} /> : "Loading..."}
        </div>
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h4>Geographic distribution</h4>
          {geoData ? <Pie data={geoData} /> : "Loading..."}
        </div>
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h4>Operational metrics</h4>
          {ops ? (
            <ul>
              <li><strong>Uptime:</strong> {ops.uptime}</li>
              <li><strong>Deployments/month:</strong> {ops.deployments}</li>
              <li><strong>Tickets closed:</strong> {ops.tickets_closed}</li>
            </ul>
          ) : "Loading..."}
        </div>
      </div>
    </div>
  );
}
