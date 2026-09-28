"use client";

// components/GraficoPBS.jsx
// costo de medicamentos según si están dentro del plan de beneficio en salud, PBS.
// Alto contraste entre verde esmeralda (PBS) y rosa coral (No PBS).

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function GraficoPBS({ datos }) {
  const total = datos.reduce((acc, d) => acc + d.costo, 0);
  const noPbs = datos.find((d) => d.pbs === "NO");
  const porcentajeNoPbs = noPbs && total > 0 ? ((noPbs.costo / total) * 100).toFixed(1) : "0";

  const colorPorEstado = {
    SI: "#10b981",  // Verde esmeralda (Cubierto por PBS)
    NO: "#f43f5e",  // Rosa / Coral intenso (Fuera de PBS)
  };

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={290}>
        <PieChart>
          <Pie
            data={datos}
            dataKey="costo"
            nameKey="pbs"
            innerRadius={72}
            outerRadius={108}
            paddingAngle={4}
            stroke="#0f172a"
            strokeWidth={3}
          >
            {datos.map((d, i) => (
              <Cell key={i} fill={colorPorEstado[d.pbs] || "#64748b"} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              borderColor: "#334155",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
              padding: "10px 14px",
            }}
            labelStyle={{ color: "#f8fafc", fontWeight: "600", marginBottom: "4px" }}
            itemStyle={{ color: "#f8fafc", fontSize: "12px", fontWeight: "500" }}
            formatter={(valor, nombre, item) => [
              new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              }).format(valor),
              item.payload.pbs === "SI" ? "Dentro del PBS" : "Fuera del PBS",
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-extrabold text-rose-400 drop-shadow-sm">{porcentajeNoPbs}%</span>
        <span className="text-xs font-medium text-slate-400">gasto fuera de PBS</span>
      </div>
    </div>
  );
}

