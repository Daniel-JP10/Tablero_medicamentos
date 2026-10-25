"use client";

// components/GraficoMunicipios.jsx
// Concentración del gasto por municipio CAF.
// Incorpora selector interactivo de escala adaptativa vs lineal para apreciar
// tanto el epicentro en Cartagena como los polos satélites en Bolívar.

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

function moneda(valor) {
  if (valor === null || valor === undefined) return "-";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

export default function GraficoMunicipios({ datos }) {
  const [escala, setEscala] = useState("adaptativa");

  if (!datos || datos.length === 0) return null;

  const datosNormalizados = datos.map((d) => {
    const esVacio = d.municipio === "Sin Asignar" || d.municipio === "0";
    const costoNum = Number(d.costo) || 0;
    const valorAdaptativo = costoNum > 0 ? Math.pow(costoNum, 0.35) : 0;

    return {
      ...d,
      costoReal: costoNum,
      valorVisual: escala === "adaptativa" ? valorAdaptativo : costoNum,
      esSinAsignar: esVacio,
    };
  });

  return (
    <div>
      {/* Selector de escala */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-slate-400">
          {escala === "adaptativa"
            ? "Escala adaptativa: revela la jerarquía de municipios satélites sin aplanarlos respecto a Cartagena."
            : "Escala lineal: magnitud directa en pesos."}
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
            dataKey="municipio"
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
              moneda(item?.payload?.costoReal ?? 0),
              `Costo total (${new Intl.NumberFormat("es-CO").format(item?.payload?.dispensaciones ?? 0)} fórmulas, ${item?.payload?.personas ?? 0} personas)`,
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
