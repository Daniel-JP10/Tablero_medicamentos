"use client";

// components/GraficoSubcuentas.jsx
// Distribución del presupuesto por subcuenta y régimen de aseguramiento.

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

function acortar(texto, max = 22) {
  return texto.length > max ? texto.slice(0, max) + "…" : texto;
}

const coloresSubcuenta = [
  "#38bdf8", // Sky 400
  "#0ea5e9", // Sky 500
  "#0284c7", // Sky 600
  "#06b6d4", // Cyan 500
  "#14b8a6", // Teal 500
  "#10b981", // Emerald 500
  "#f59e0b", // Amber 500
  "#64748b", // Slate 500
];

export default function GraficoSubcuentas({ datos }) {
  if (!datos || datos.length === 0) return null;

  const datosPreparados = datos.map((d) => ({
    ...d,
    nombreCorto: acortar(d.subcuenta),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="vertical"
        data={datosPreparados}
        margin={{ top: 10, right: 25, left: 10, bottom: 10 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="nombreCorto"
          width={160}
          stroke="#cbd5e1"
          fontSize={11}
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
          formatter={(valor, _, item) => [
            moneda(valor),
            `Costo (${item?.payload?.porcentajeCosto}%, ${new Intl.NumberFormat("es-CO").format(item?.payload?.dispensaciones)} fórmulas)`,
          ]}
        />
        <Bar dataKey="costo" radius={[0, 8, 8, 0]}>
          {datosPreparados.map((_, i) => (
            <Cell key={i} fill={coloresSubcuenta[i % coloresSubcuenta.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
