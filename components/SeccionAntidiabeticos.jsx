"use client";

// components/SeccionAntidiabeticos.jsx
// análisis del grupo ANTIDIABETICOS. Resalta en tono ámbar y dorado de alerta médica.

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, Syringe, PiggyBank } from "lucide-react";

function moneda(valor) {
  if (valor === null || valor === undefined) return "-";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

export default function SeccionAntidiabeticos({ datos }) {
  if (!datos) return null;

  const {
    evolucionMensual,
    topMedicamentos,
    costoPromedioFormulaGrupo,
    costoPromedioFormulaGlobal,
    variacionPorcentual,
  } = datos;

  const subio = variacionPorcentual !== null && variacionPorcentual > 0;
  const medicamentoTop = topMedicamentos?.[0];
  const diferenciaFormula =
    costoPromedioFormulaGrupo && costoPromedioFormulaGlobal
      ? (
          ((costoPromedioFormulaGrupo - costoPromedioFormulaGlobal) /
            costoPromedioFormulaGlobal) *
          100
        ).toFixed(1)
      : null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-amber-950/20 p-8 shadow-2xl backdrop-blur-md">
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
        Análisis de cierre
      </div>

      <h3 className="mt-3 text-2xl font-black tracking-tight text-white md:text-3xl">
        Grupo ANTIDIABETICOS: la historia detrás del azúcar
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
        Entre enero y agosto de 2021, este grupo farmacológico dejó de ser una
        línea plana en el presupuesto y empezó a comportarse como una curva
        que la EPS necesita vigilar de cerca.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-amber-500/20 bg-slate-950/60 p-5 shadow-inner">
          <div className="inline-block rounded-xl bg-amber-500/10 p-2 text-amber-400">
            <TrendingUp size={20} />
          </div>
          <p className="mt-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Tendencia del costo mensual</p>
          <p className="mt-1 text-2xl font-black text-white">
            {subio ? "Aumentó" : "Disminuyó"}{" "}
            {variacionPorcentual !== null ? `${Math.abs(variacionPorcentual).toFixed(1)}%` : ""}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            comparando primer y último mes con datos
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-slate-950/60 p-5 shadow-inner">
          <div className="inline-block rounded-xl bg-amber-500/10 p-2 text-amber-400">
            <Syringe size={20} />
          </div>
          <p className="mt-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Medicamento más costoso</p>
          <p className="mt-1 text-lg font-bold text-white line-clamp-1">
            {medicamentoTop?.descripcion ?? "-"}
          </p>
          <p className="mt-1 text-xs text-amber-300/90 font-medium">
            {medicamentoTop ? moneda(medicamentoTop.costo) : ""} acumulados
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-slate-950/60 p-5 shadow-inner">
          <div className="inline-block rounded-xl bg-amber-500/10 p-2 text-amber-400">
            <PiggyBank size={20} />
          </div>
          <p className="mt-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Costo promedio de fórmula</p>
          <p className="mt-1 text-2xl font-black text-white">
            {moneda(costoPromedioFormulaGrupo)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {diferenciaFormula
              ? `${diferenciaFormula > 0 ? "+" : ""}${diferenciaFormula}% frente al promedio general`
              : ""}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={evolucionMensual} margin={{ top: 15, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
            <XAxis
              dataKey="mes"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
              dy={8}
              height={32}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                borderColor: "#f59e0b",
                borderRadius: "12px",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                padding: "10px 14px",
              }}
              labelStyle={{ color: "#fbbf24", fontWeight: "600" }}
              itemStyle={{ color: "#f8fafc" }}
              formatter={(valor) => [moneda(valor), "Costo del grupo"]}
            />
            <Line
              type="monotone"
              dataKey="costo"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 5, fill: "#f59e0b", stroke: "#0f172a", strokeWidth: 2 }}
              activeDot={{ r: 7, fill: "#fbbf24" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

