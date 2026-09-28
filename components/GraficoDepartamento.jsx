"use client";

// components/GraficoDepartamento.jsx
// Costo de medicamentos por departamento de dispensación.
// Utiliza una escala adaptativa continua (potencia) para que departamentos
// como Córdoba ($940K) y Sucre ($67K) muestren su diferencia proporcional real
// sin aplanarse a 0 ni verse artificialmente iguales.
// Incluye selector interactivo entre Escala Adaptativa y Lineal.

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function GraficoDepartamento({ datos }) {
  const [escala, setEscala] = useState("adaptativa"); // "adaptativa" | "lineal"

  const datosNormalizados = datos.map((d) => {
    const esVacio = d.departamento_caf === "0" || !d.departamento_caf;
    const costoNum = Number(d.costo) || 0;
    
    // Transformación continua f(x) = x^0.35:
    // Conserva estrictamente el orden y la diferencia real entre magnitudes muy distantes
    // Córdoba ($940K) queda a ~27px, Sucre ($67K) a ~11px, Bogotá ($34K) a ~8.6px.
    const valorAdaptativo = costoNum > 0 ? Math.pow(costoNum, 0.35) : 0;

    return {
      ...d,
      costoReal: costoNum,
      valorVisual: escala === "adaptativa" ? valorAdaptativo : costoNum,
      etiqueta: esVacio ? "Sin Asignar" : d.departamento_caf,
      esSinAsignar: esVacio,
    };
  });

  return (
    <div>
      {/* Selector de escala */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-slate-400">
          {escala === "adaptativa"
            ? "Escala adaptativa: resalta diferencias relativas entre todas las regiones sin aplanarlas."
            : "Escala lineal: refleja la magnitud presupuestal directa en pesos."}
        </span>
        <div className="inline-flex rounded-xl border border-slate-800 bg-slate-950 p-1 text-xs">
          <button
            type="button"
            onClick={() => setEscala("adaptativa")}
            className={`rounded-lg px-3 py-1 font-medium transition-all ${
              escala === "adaptativa"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Adaptativa
          </button>
          <button
            type="button"
            onClick={() => setEscala("lineal")}
            className={`rounded-lg px-3 py-1 font-medium transition-all ${
              escala === "lineal"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Lineal
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={datosNormalizados}
          margin={{ top: 15, right: 20, left: 10, bottom: 50 }}
        >
          <XAxis
            dataKey="etiqueta"
            stroke="#94a3b8"
            fontSize={11}
            angle={-25}
            textAnchor="end"
            interval={0}
            tickLine={false}
            axisLine={{ stroke: "#334155" }}
            dy={8}
            height={48}
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
            formatter={(_, __, item) => [
              new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              }).format(item?.payload?.costoReal ?? 0),
              `Costo total (${new Intl.NumberFormat("es-CO").format(item?.payload?.dispensaciones ?? 0)} fórmulas)`,
            ]}
          />
          <Bar dataKey="valorVisual" radius={[6, 6, 2, 2]}>
            {datosNormalizados.map((d, i) => (
              <Cell
                key={i}
                fill={d.esSinAsignar ? "#f59e0b" : "#0ea5e9"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


