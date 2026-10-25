"use client";

// components/SeccionPolifarmacia.jsx
// Investigación de riesgo clínico: Concentración de pacientes, polifarmacia e hiperfrecuentación.
// Evidencia que un grupo reducido de pacientes crónicos complejos absorbe una proporción masiva del gasto.

import { Pill, Activity, AlertTriangle, UserCheck } from "lucide-react";

function moneda(valor) {
  if (valor === null || valor === undefined) return "-";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

export default function SeccionPolifarmacia({ datos }) {
  if (!datos) return null;

  const {
    total_pacientes,
    promedio_moleculas_por_paciente,
    max_moleculas_paciente,
    promedio_formulas_por_paciente,
    max_formulas_paciente,
    costo_promedio_paciente,
    max_costo_paciente,
    pacientes_polifarmacia,
    pacientes_hiperpolifarmacia,
    porcentajePolifarmacia,
    porcentajeHiperpolifarmacia,
    topPacientes,
  } = datos;

  return (
    <div className="space-y-6">
      {/* Indicadores de riesgo de polifarmacia */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-sky-500/20 bg-slate-950/60 p-4">
          <div className="flex items-center gap-2 text-sky-400">
            <Pill size={18} />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Promedio Moléculas</span>
          </div>
          <p className="mt-2 text-2xl font-black text-white">
            {promedio_moleculas_por_paciente ? Number(promedio_moleculas_por_paciente).toFixed(1) : "-"}
          </p>
          <p className="mt-1 text-xs text-slate-400">principios activos por paciente</p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-slate-950/60 p-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Activity size={18} />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Tasa de Polifarmacia</span>
          </div>
          <p className="mt-2 text-2xl font-black text-white">
            {porcentajePolifarmacia}%
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {pacientes_polifarmacia} pacientes consumen ≥ 5 moléculas
          </p>
        </div>

        <div className="rounded-2xl border border-rose-500/20 bg-slate-950/60 p-4">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle size={18} />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Hiperpolifarmacia</span>
          </div>
          <p className="mt-2 text-2xl font-black text-white">
            {porcentajeHiperpolifarmacia}%
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {pacientes_hiperpolifarmacia} pacientes consumen ≥ 10 moléculas
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-slate-950/60 p-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <UserCheck size={18} />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Máximo Caso Individual</span>
          </div>
          <p className="mt-2 text-xl font-black text-white">
            {moneda(max_costo_paciente)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            con {max_moleculas_paciente} moléculas y {max_formulas_paciente} fórmulas
          </p>
        </div>
      </div>

      {/* Tabla analítica: Top 5 pacientes de mayor impacto (Pareto 80/20) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Top 5 Pacientes de Mayor Carga Financiera (Gestión de Riesgo EPS)
          </h4>
          <span className="text-xs text-slate-400">Identificación anonimizada</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2.5 font-semibold">Paciente</th>
                <th className="pb-2.5 text-center font-semibold">Moléculas Distintas</th>
                <th className="pb-2.5 text-center font-semibold">Fórmulas Médicas</th>
                <th className="pb-2.5 text-center font-semibold">Dispensaciones</th>
                <th className="pb-2.5 text-right font-semibold">Gasto Total Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {topPacientes?.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-2.5 font-medium text-cyan-300">{p.paciente_anonimo}</td>
                  <td className="py-2.5 text-center font-mono">{p.moleculas_distintas}</td>
                  <td className="py-2.5 text-center font-mono">{p.formulas}</td>
                  <td className="py-2.5 text-center font-mono">{p.dispensaciones}</td>
                  <td className="py-2.5 text-right font-bold text-emerald-400">{moneda(p.costo_total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
