"use client";

// components/GraficoTopMedicamentos.jsx
// top de medicamentos con mayor costo total.
// Barras horizontales ordenadas de mayor a menor costo con colores distintivos.

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function acortar(texto, max = 38) {
  return texto.length > max ? texto.slice(0, max) + "…" : texto;
}

// Paleta semántica con alto contraste para storytelling
const colores = [
  "#f43f5e", // Rose 500
  "#f97316", // Orange 500
  "#eab308", // Yellow 500
  "#06b6d4", // Cyan 500
  "#10b981", // Emerald 500
  "#8b5cf6", // Violet 500
  "#38bdf8", // Sky 400
];

export default function GraficoTopMedicamentos({ datos }) {
  const preparados = datos.map((d) => ({ ...d, nombreCorto: acortar(d.descripcion) }));

  return (
    <ResponsiveContainer width="100%" height={430}>
      <BarChart
        layout="vertical"
        data={preparados}
        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="nombreCorto"
          width={240}
          stroke="#cbd5e1"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(255, 255, 255, 0.05)", radius: 6 }}
          contentStyle={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            borderColor: "#334155",
            borderRadius: "12px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
            padding: "10px 14px",
          }}
          labelStyle={{ color: "#f8fafc", fontWeight: "600", marginBottom: "4px" }}
          itemStyle={{ color: "#38bdf8" }}
          formatter={(valor) => [
            new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              maximumFractionDigits: 0,
            }).format(valor),
            "Costo total",
          ]}
        />
        <Bar dataKey="costo" radius={[0, 8, 8, 0]}>
          {preparados.map((_, i) => (
            <Cell key={i} fill={colores[i % colores.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

