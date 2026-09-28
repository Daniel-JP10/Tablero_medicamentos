"use client";

// components/BarraFiltros.jsx
// los 4 filtros globales para segmentar el análisis

import { SlidersHorizontal, RotateCcw } from "lucide-react";

const meses = [
  { valor: "01", etiqueta: "Enero" },
  { valor: "02", etiqueta: "Febrero" },
  { valor: "03", etiqueta: "Marzo" },
  { valor: "04", etiqueta: "Abril" },
  { valor: "05", etiqueta: "Mayo" },
  { valor: "06", etiqueta: "Junio" },
  { valor: "07", etiqueta: "Julio" },
  { valor: "08", etiqueta: "Agosto" },
  { valor: "09", etiqueta: "Septiembre" },
  { valor: "10", etiqueta: "Octubre" },
  { valor: "11", etiqueta: "Noviembre" },
  { valor: "12", etiqueta: "Diciembre" },
];

export default function BarraFiltros({ opciones, filtros, onCambiar }) {
  const hayFiltrosActivos =
    filtros.grupo !== "todos" ||
    filtros.anio !== "todos" ||
    filtros.mes !== "todos" ||
    filtros.regional !== "todas";

  return (
    <div className="sticky top-0 z-30 rounded-t-3xl border-b border-slate-800/90 bg-slate-900/95 px-4 py-3.5 sm:px-6 backdrop-blur-md shadow-md">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-cyan-400 mr-2">
          <SlidersHorizontal size={17} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Filtros</span>
        </div>

        <select
          value={filtros.grupo}
          onChange={(e) => onCambiar("grupo", e.target.value)}
          className="rounded-xl border border-slate-700/80 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 transition-all hover:border-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <option value="todos">Grupo farmacológico: todos</option>
          {opciones.grupos?.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={filtros.anio}
          onChange={(e) => onCambiar("anio", e.target.value)}
          className="rounded-xl border border-slate-700/80 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 transition-all hover:border-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <option value="todos">Año: todos</option>
          {opciones.anios?.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select
          value={filtros.mes}
          onChange={(e) => onCambiar("mes", e.target.value)}
          className="rounded-xl border border-slate-700/80 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 transition-all hover:border-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <option value="todos">Mes: todos</option>
          {meses.map((m) => (
            <option key={m.valor} value={m.valor}>
              {m.etiqueta}
            </option>
          ))}
        </select>

        <select
          value={filtros.regional}
          onChange={(e) => onCambiar("regional", e.target.value)}
          className="rounded-xl border border-slate-700/80 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 transition-all hover:border-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <option value="todas">Regional CAF: todas</option>
          {opciones.regionales?.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {hayFiltrosActivos && (
          <button
            onClick={() =>
              onCambiar("reset", { grupo: "todos", anio: "todos", mes: "todos", regional: "todas" })
            }
            className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 transition-all hover:bg-rose-500/20"
          >
            <RotateCcw size={13} />
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}

