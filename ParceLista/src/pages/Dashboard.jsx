import { useState } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,} from "recharts";

const INITIAL_TASKS = [
  { id: 1, text: "Entregar informe de biología", done: true,  tag: "Estudio" },
  { id: 2, text: "Revisar apuntes de matemáticas", done: false, tag: "Estudio" },
  { id: 3, text: "Preparar presentación del equipo", done: false, tag: "Trabajo" },
];

const weekData = [
  { day: "Lun", tareas: 4, completadas: 3 },
  { day: "Mar", tareas: 6, completadas: 4 },
  { day: "Mié", tareas: 3, completadas: 3 },
  { day: "Jue", tareas: 7, completadas: 5 },
  { day: "Vie", tareas: 5, completadas: 2 },
  { day: "Sáb", tareas: 2, completadas: 1 },
  { day: "Dom", tareas: 1, completadas: 1 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <article style={{
      background: "#fff", border: "1px solid rgba(26,26,46,0.08)",
      borderRadius: 8, padding: "10px 14px", fontSize: 13,
    }}>
      <p style={{ fontWeight: 600, marginBottom: 4, color: "#1A1A2E" }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name === "completadas" ? "✓ Completadas" : "● Tareas"}: {p.value}
        </p>
      ))}
    </article>
  );
};

export default function Dashboard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [input, setInput] = useState("");

  const total     = tasks.length;
  const done      = tasks.filter((t) => t.done).length;
  const pending   = total - done;
  const pct       = total > 0 ? Math.round((done / total) * 100) : 0;

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t));

  const addTask = () => {
    if (!input.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: input.trim(), done: false, tag: "General" },
    ]);
    setInput("");
  };

  const today = new Date().toLocaleDateString("es-CO", {
    weekday: "long", day: "numeric", month: "long",
  });

  return (
    <main className="main-content">
      {/* Top bar */}
      <article className="topbar">
        <article className="page-header" style={{ margin: 0 }}>
          <h1>ParceLista</h1>
          <p style={{ textTransform: "capitalize" }}>{today}</p>
        </article>
        <span className="clock-badge">
          {pct}% completado hoy
        </span>
      </article>

      {/* Stats */}
      <article className="stats-grid">
        <article className="stat-card total">
          <article className="stat-label">Total tareas</article>
          <article className="stat-value">{total}</article>
          <span className="stat-badge total">📋 esta semana</span>
        </article>
        <article className="stat-card done">
          <article className="stat-label">Completadas</article>
          <article className="stat-value">{done}</article>
          <span className="stat-badge done">✓ muy bien</span>
        </article>
        <article className="stat-card pending">
          <article className="stat-label">Pendientes</article>
          <article className="stat-value">{pending}</article>
          <span className="stat-badge pending">⏳ por hacer</span>
        </article>
      </article>

      {/* Progress */}
      <article className="progress-section">
        <article className="progress-header">
          <span className="progress-title">Progreso del día</span>
          <span className="progress-pct">{pct}%</span>
        </article>
        <article className="progress-track">
          <article className="progress-fill" style={{ width: `${pct}%` }} />
        </article>
        <p style={{ fontSize: 12, color: "var(--text-light)", marginTop: 10 }}>
          {done} de {total} tareas completadas
        </p>
      </article>

      {/* Two-column below */}
      <article style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Tasks */}
        <article className="chart-section">
          <article className="section-title">Mis tareas</article>
          <article className="section-sub">Márcalas a medida que avanzas</article>

          <article className="add-task-row">
            <input
              className="task-input"
              placeholder="Nueva tarea..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <button className="btn-add" onClick={addTask}>+ Agregar</button>
          </article>

          <article className="task-list">
            {tasks.map((task) => (
              <article key={task.id} className="task-item">
                <article
                  className={`task-check${task.done ? " checked" : ""}`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.done && "✓"}
                </article>
                <span className={`task-text${task.done ? " done" : ""}`}>
                  {task.text}
                </span>
                <span className="task-tag">{task.tag}</span>
              </article>
            ))}
          </article>
        </article>

        {/* Chart */}
        <article className="chart-section">
          <article className="section-title">Rendimiento semanal</article>
          <article className="section-sub">Tareas asignadas vs completadas</article>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weekData} barGap={4} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,46,0.05)" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "var(--text-light)", fontFamily: "DM Sans" }}
                axisLine={false} tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "var(--text-light)", fontFamily: "DM Sans" }}
                axisLine={false} tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(26,26,46,0.03)" }} />
              <Bar dataKey="tareas" fill="rgba(233,166,58,0.25)" radius={[4,4,0,0]} name="tareas" />
              <Bar dataKey="completadas" fill="#4DC991" radius={[4,4,0,0]} name="completadas" />
            </BarChart>
          </ResponsiveContainer>

          <article style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <article style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-secondary)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(233,166,58,0.4)", display: "inline-block" }} />
              Asignadas
            </article>
            <article style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-secondary)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "#4DC991", display: "inline-block" }} />
              Completadas
            </article>
          </article>
        </article>
      </article>
    </main>
  );
}