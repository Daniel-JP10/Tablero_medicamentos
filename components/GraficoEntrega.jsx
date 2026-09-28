"use client";

// components/GraficoEntrega.jsx
// costo de medicamentos según tipo de entrega.
// Colores diferenciados para contraste claro entre presencial y domicilio.

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const colorPorTipo = {
  PRESENCIAL: "#10b981",     // Verde esmeralda vibrante
  DOMICILIARIO: "#6366f1",   // Índigo moderno
  "SIN REGISTRO": "#64748b", // Gris pizarra
};

export default function GraficoEntrega({ datos }) {
  return (
    <ResponsiveContainer width="100%" height={290}>
      <BarChart data={datos} margin={{ top: 15, right: 20, left: 10, bottom: 25 }}>
        <XAxis
          dataKey="tipo_entrega"
          stroke="#94a3b8"
          fontSize={11}
          tickLine={false}
          axisLine={{ stroke: "#334155" }}
          dy={6}
          height={30}
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
          formatter={(valor) => [
            new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              maximumFractionDigits: 0,
            }).format(valor),
            "Costo total",
          ]}
        />
        <Bar dataKey="costo" radius={[8, 8, 2, 2]}>
          {datos.map((d, i) => (
            <Cell key={i} fill={colorPorTipo[d.tipo_entrega] || "#94a3b8"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

