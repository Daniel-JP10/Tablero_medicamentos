"use client";

// components/SeccionAuditoriaCalidad.jsx
// Investigación forense y calidad del dato transaccional en salud.
// Expone el hallazgo crítico: los 1.241 registros "Sin Asignar" corresponden al circuito de alta complejidad por Evento.

import { ShieldCheck, Database, Search, ArrowRight } from "lucide-react";

export default function SeccionAuditoriaCalidad() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-sky-500/30 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-sky-950/20 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
      <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
        <ShieldCheck size={14} className="text-sky-400" />
        Auditoría Forense y Gobernanza del Dato
      </div>

      <h3 className="mt-3 text-2xl font-black tracking-tight text-white md:text-3xl">
        El enigma de los $461.8 millones en registros &ldquo;Sin Asignar&rdquo;
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
        Durante la auditoría de la base de datos se detectó que <strong>1.241 registros</strong> carecen de asignación geográfica departamental y municipal (marcados como código <code className="rounded bg-slate-800 px-1.5 py-0.5 text-amber-300 font-mono text-xs">0</code>). Al cruzar variables relacionales, la investigación reveló un patrón concluyente de calidad de datos.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-inner">
          <div className="inline-block rounded-xl bg-sky-500/10 p-2 text-sky-400">
            <Search size={20} />
          </div>
          <p className="mt-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Hallazgo de Correlación</p>
          <p className="mt-1 text-base font-bold text-white">
            100% de coincidencia con Evento
          </p>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Todos los registros sin geografía corresponden a la modalidad de contratación por <strong>EVENTO</strong> y subcuenta especial.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-inner">
          <div className="inline-block rounded-xl bg-amber-500/10 p-2 text-amber-400">
            <Database size={20} />
          </div>
          <p className="mt-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Causa Raíz Operativa</p>
          <p className="mt-1 text-base font-bold text-white">
            Facturación Centralizada
          </p>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Las moléculas de ultra-alto costo (biológicos, oncológicos) no se despachan en la red ambulatoria territorial del CAF sino desde centros especializados.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-inner">
          <div className="inline-block rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
            <ShieldCheck size={20} />
          </div>
          <p className="mt-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Impacto para la EPS</p>
          <p className="mt-1 text-base font-bold text-white">
            Recomendación de Trazabilidad
          </p>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Se requiere estandarizar el código DANE de dispensación hospitalaria para auditar la radicación geográfica del 61.9% del presupuesto.
          </p>
        </div>
      </div>
    </div>
  );
}
