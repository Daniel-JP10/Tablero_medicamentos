"use client";

// components/GraficoCronicos.jsx
// Investigación farmacoepidemiológica: Tratamiento Crónico vs Agudo.
// Demuestra la diferencia en costo promedio por prescripción (>6x) y la adherencia en pacientes crónicos.

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function moneda(valor) {
  if (valor === null || valor === undefined) return "-";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

const coloresCategoria = {
  "Tratamiento Crónico": "#10b981",         // Emerald
  "Tratamiento Agudo": "#38bdf8",           // Sky
  "Sin Clasificar / Especial": "#f59e0b",   // Amber
};

export default function GraficoCronicos({ datos }) {
  if (!datos || datos.length === 0) return null;

  return (
    <div>
      {/* Resumen de métricas clave */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
        {datos.map((d, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-800 bg-slate-950/50 p-3.5"
          >
            <p className="font-semibold text-slate-300">{d.categoria}</p>
            <p className="mt-1 text-lg font-bold text-white">{moneda(d.costo)}</p>
            <div className="mt-1 flex items-center justify-between text-slate-400">
              <span>{new Intl.NumberFormat("es-CO").format(d.dispensaciones)} fórmulas</span>
              <span className="font-medium text-emerald-400">Prom: {moneda(d.costo_promedio)}</span>
            </div>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={datos} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
          <XAxis
            dataKey="categoria"
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#334155" }}
            dy={6}
          />
          <YAxis hide />
          <Tooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.05)", radius: 8 }}
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              borderColor: "#334155",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
              padding: "10px 14px",
            }}
            labelStyle={{ color: "#f8fafc", fontWeight: "600", marginBottom: "4px" }}
            itemStyle={{ color: "#38bdf8" }}
            formatter={(valor, _, item) => [
              moneda(valor),
              `Costo total (${item?.payload?.porcentajeCosto}%, ${new Intl.NumberFormat("es-CO").format(item?.payload?.personas)} pacientes)`,
            ]}
          />
          <Bar dataKey="costo" radius={[8, 8, 2, 2]}>
            {datos.map((d, i) => (
              <Cell key={i} fill={coloresCategoria[d.categoria] || "#10b981"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
