"use client";

// components/GraficoTiempo.jsx
// dispensación de medicamentos en el tiempo.
// Gradiente cian/teal de alto contraste sobre fondo oscuro para destacar la marea del gasto mes a mes.

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function formatearCorto(valor) {
  if (valor >= 1_000_000) return `$${(valor / 1_000_000).toFixed(1)}M`;
  if (valor >= 1_000) return `$${(valor / 1_000).toFixed(0)}K`;
  return `$${valor}`;
}

export default function GraficoTiempo({ datos }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <AreaChart data={datos} margin={{ top: 15, right: 20, left: 10, bottom: 25 }}>
        <defs>
          <linearGradient id="colorCosto" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.45} />
            <stop offset="90%" stopColor="#06b6d4" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} vertical={false} />
        <XAxis
          dataKey="mes"
          stroke="#94a3b8"
          fontSize={11}
          tickLine={false}
          axisLine={{ stroke: "#334155" }}
          dy={8}
          height={32}
        />
        <YAxis
          tickFormatter={formatearCorto}
          stroke="#94a3b8"
          fontSize={11}
          tickLine={false}
          axisLine={{ stroke: "#334155" }}
          dx={-4}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            borderColor: "#334155",
            borderRadius: "12px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
            padding: "10px 14px",
          }}
          labelStyle={{ color: "#38bdf8", fontWeight: "600", marginBottom: "4px" }}
          itemStyle={{ color: "#f1f5f9" }}
          formatter={(valor, nombre) =>
            nombre === "costo"
              ? [formatearCorto(valor), "Costo dispensado"]
              : [valor, "Dispensaciones"]
          }
        />
        <Area
          type="monotone"
          dataKey="costo"
          stroke="#22d3ee"
          strokeWidth={3}
          fill="url(#colorCosto)"
          activeDot={{ r: 6, fill: "#22d3ee", stroke: "#0f172a", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

