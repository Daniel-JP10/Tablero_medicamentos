"use client";

// components/GraficoContratos.jsx
// Análisis de la asimetría presupuestal: Cápita vs Evento.
// Demuestra que el 4% del volumen transaccional en Evento absorbe más del 60% del presupuesto.

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ShieldAlert, Layers } from "lucide-react";

function moneda(valor) {
  if (valor === null || valor === undefined) return "-";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

const coloresContrato = {
  EVENTO: "#f43f5e", // Rose (Alta complejidad / Alto impacto)
  CAPITA: "#06b6d4", // Cyan (Atención primaria / Masiva)
};

export default function GraficoContratos({ datos }) {
  if (!datos || datos.length === 0) return null;

  const evento = datos.find((d) => d.contrato === "EVENTO");
  const capita = datos.find((d) => d.contrato === "CAPITA");

  const datosGrafico = datos.map((d) => ({
    ...d,
    etiqueta: d.contrato === "EVENTO" ? "Por Evento (Alta Complejidad)" : "Por Cápita (Red Primaria)",
  }));

  return (
    <div>
      {/* Tarjetas comparativas de asimetría */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-rose-500/30 bg-slate-950/60 p-4 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Modalidad Evento</span>
            <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-xs font-semibold text-rose-300 border border-rose-500/20">
              {evento?.porcentajeCosto ?? "61.9"}% del presupuesto
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-white">{moneda(evento?.costo)}</p>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>{new Intl.NumberFormat("es-CO").format(evento?.dispensaciones ?? 0)} fórmulas</span>
            <span className="text-rose-300 font-medium">
              Prom: {moneda(evento?.costo_promedio_dispensacion)} / fórmula
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/60 p-4 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Modalidad Cápita</span>
            <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs font-semibold text-cyan-300 border border-cyan-500/20">
              {capita?.porcentajeDispensaciones ?? "96.0"}% de la demanda
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-white">{moneda(capita?.costo)}</p>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>{new Intl.NumberFormat("es-CO").format(capita?.dispensaciones ?? 0)} fórmulas</span>
            <span className="text-cyan-300 font-medium">
              Prom: {moneda(capita?.costo_promedio_dispensacion)} / fórmula
            </span>
          </div>
        </div>
      </div>

      {/* Gráfico comparativo de costo */}
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={datosGrafico} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
          <XAxis
            dataKey="etiqueta"
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
              `Costo total (${item?.payload?.porcentajeCosto}% del total, ${new Intl.NumberFormat("es-CO").format(item?.payload?.dispensaciones)} fórmulas)`,
            ]}
          />
          <Bar dataKey="costo" radius={[8, 8, 2, 2]}>
            {datosGrafico.map((d, i) => (
              <Cell key={i} fill={coloresContrato[d.contrato] || "#06b6d4"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
