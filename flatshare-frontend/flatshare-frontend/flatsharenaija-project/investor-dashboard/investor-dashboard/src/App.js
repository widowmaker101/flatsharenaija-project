import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

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
      fetch(`${api}/metrics/ops`).then(r => r.json())
    ]).then(([u, r, g, o]) => {
      setUsers(u);
      setRevenue(r);
      setGeo(g);
      setOps(o);
    });
  }, []);

  const usersData =
    users && {
      labels: users.months,
      datasets: [
        {
          label: "New Signups",
          data: users.signups,
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,0.2)"
        }
      ]
    };

  const revenueData =
    revenue && {
      labels: revenue.months,
      datasets: [
        { label: "Free", data: revenue.free, backgroundColor: "#93c5fd" },
        { label: "Paid", data: revenue.paid, backgroundColor: "#60a5fa" },
        { label: "Premium", data: revenue.premium, backgroundColor: "#2563eb" }
      ]
    };

  const geoData =
    geo && {
      labels: geo.labels,
      datasets: [
        {
          data: geo.values,
          backgroundColor: [
            "#2563eb",
            "#10b981",
            "#f59e0b",
            "#ef4444",
            "#8b5cf6"
          ]
        }
      ]
    };

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: 24 }}>
      <h2>Investor Demo Dashboard</h2>

      {/* KPI Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 24
        }}
      >
        <div
          style={{
            background: "#2563eb",
            color: "white",
            padding: "12px 24px",
            borderRadius: 8
          }}
        >
          <h4>MAU</h4>
          <p>
            {users ? users.signups.reduce((a, b) => a + b, 0) : "Loading..."}{" "}
            users
          </p>
        </div>
        <div
          style={{
            background: "#10b981",
            color: "white",
            padding: "12px 24px",
            borderRadius: 8
          }}
        >
          <h4>MRR</h4>
          <p>
            $
            {revenue
              ? revenue.premium.reduce((a, b) => a + b, 0)
              : "Loading..."}
          </p>
        </div>
        <div
          style={{
            background: "#f59e0b",
            color: "white",
            padding: "12px 24px",
            borderRadius: 8
          }}
        >
          <h4>Uptime</h4>
          <p>{ops ? ops.uptime : "Loading..."}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24
        }}
      >
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h4>User growth</h4>
          {usersData ? <Line data={usersData} /> : "Loading..."}
        </div>
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h4>Revenue breakdown</h4>
          {revenueData ? (
            <Bar
              data={revenueData}
              options={{
                responsive: true,
                plugins: { legend: { position: "bottom" } },
                scales: { x: { stacked: true }, y: { stacked: true } }
              }}
            />
          ) : (
            "Loading..."
          )}
        </div>
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h4>Geographic distribution</h4>
          {geoData ? <Pie data={geoData} /> : "Loading..."}
        </div>
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h4>Operational metrics</h4>
          {ops ? (
            <ul>
              <li>
                <strong>Uptime:</strong> {ops.uptime}
              </li>
              <li>
                <strong>Deployments/month:</strong> {ops.deployments}
              </li>
              <li>
                <strong>Tickets closed:</strong> {ops.tickets_closed}
              </li>
            </ul>
          ) : (
            "Loading..."
          )}
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div style={{ marginTop: 48 }}>
        <h3>Roadmap Highlights</h3>
        <VerticalTimeline>
          <VerticalTimelineElement
            date="Q1 2026"
            iconStyle={{ background: "#2563eb", color: "#fff" }}
          >
            <h4>Feature Release</h4>
            <p>Launch premium analytics dashboard</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            date="Q2 2026"
            iconStyle={{ background: "#10b981", color: "#fff" }}
          >
            <h4>Expansion</h4>
            <p>Enter 3 new African markets</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            date="Q3 2026"
            iconStyle={{ background: "#f59e0b", color: "#fff" }}
          >
            <h4>Monetization</h4>
            <p>Introduce subscription tiers with payment gateway integration</p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}
