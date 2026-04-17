import { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  const [activePath, setActivePath] = useState("/");

  return (
    <article className="app-layout">
      <Header activePath={activePath} onNavigate={setActivePath} />
      {activePath === "/" && <Dashboard />}
      {activePath !== "/" && (
        <main className="main-content" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <article style={{ textAlign: "center" }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>🚧</p>
            <p style={{ fontSize: 16, color: "var(--text-secondary)" }}>Sección en construcción</p>
          </article>
        </main>
      )}
    </article>
  );
}