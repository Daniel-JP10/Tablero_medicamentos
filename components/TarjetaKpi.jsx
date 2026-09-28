"use client";

// components/TarjetaKpi.jsx
// Cada KPI se anima contando desde 0 hasta su valor real cuando entra en pantalla.
// Tarjetas con superficies con profundidad, iconos y bordes de acento de alto contraste.

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, FileText, DollarSign, Activity } from "lucide-react";

function formatearNumero(valor, esMoneda) {
  if (valor === null || valor === undefined) return "-";
  const redondeado = Math.round(valor);
  if (esMoneda) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(redondeado);
  }
  return new Intl.NumberFormat("es-CO").format(redondeado);
}

const estilosAcento = {
  eps: {
    border: "border-sky-500/30 hover:border-sky-500/60",
    badge: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    glow: "from-sky-500/10",
    icono: Users,
  },
  salud: {
    border: "border-emerald-500/30 hover:border-emerald-500/60",
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    glow: "from-emerald-500/10",
    icono: FileText,
  },
  alerta: {
    border: "border-amber-500/30 hover:border-amber-500/60",
    badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    glow: "from-amber-500/10",
    icono: DollarSign,
  },
  urgencia: {
    border: "border-rose-500/30 hover:border-rose-500/60",
    badge: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    glow: "from-rose-500/10",
    icono: Activity,
  },
};

export default function TarjetaKpi({ etiqueta, valor, esMoneda = false, acento = "eps", descripcion }) {
  const refNumero = useRef(null);
  const refContenedor = useRef(null);
  const enVista = useInView(refContenedor, { once: true, amount: 0.5 });
  const config = estilosAcento[acento] || estilosAcento.eps;
  const Icono = config.icono;

  useEffect(() => {
    if (!enVista || valor === null || valor === undefined) return;
    const controles = animate(0, valor, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(latest) {
        if (refNumero.current) {
          refNumero.current.textContent = formatearNumero(latest, esMoneda);
        }
      },
    });
    return () => controles.stop();
  }, [enVista, valor, esMoneda]);

  return (
    <motion.div
      ref={refContenedor}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl border ${config.border} bg-slate-900/90 backdrop-blur-md p-6 shadow-xl shadow-black/25 transition-all`}
    >
      <div className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${config.glow} to-transparent blur-2xl`} />
      
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{etiqueta}</p>
        <div className={`rounded-xl p-2 ${config.badge}`}>
          <Icono size={18} />
        </div>
      </div>
      
      <p ref={refNumero} className="mt-3 text-3xl font-black tracking-tight text-white">
        0
      </p>
      
      {descripcion ? (
        <p className="mt-2 text-xs leading-relaxed text-slate-400">{descripcion}</p>
      ) : null}
    </motion.div>
  );
}

