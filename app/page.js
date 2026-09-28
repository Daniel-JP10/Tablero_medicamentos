"use client";

// Aquí se arma la historia completa del tablero, sección por sección.

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import BarraFiltros from "@/components/BarraFiltros";
import TarjetaKpi from "@/components/TarjetaKpi";
import SeccionRevelada from "@/components/SeccionRevelada";
import GraficoTiempo from "@/components/GraficoTiempo";
import GraficoTopMedicamentos from "@/components/GraficoTopMedicamentos";
import GraficoPBS from "@/components/GraficoPBS";
import GraficoDepartamento from "@/components/GraficoDepartamento";
import GraficoEntrega from "@/components/GraficoEntrega";
import SeccionAntidiabeticos from "@/components/SeccionAntidiabeticos";

// Construye el query string a partir del objeto de filtros activo,
// para que cada endpoint reciba exactamente los mismos parámetros.
function aQueryString(filtros) {
  const parametros = new URLSearchParams();
  if (filtros.grupo !== "todos") parametros.set("grupo", filtros.grupo);
  if (filtros.anio !== "todos") parametros.set("anio", filtros.anio);
  if (filtros.mes !== "todos") parametros.set("mes", filtros.mes);
  if (filtros.regional !== "todas") parametros.set("regional", filtros.regional);
  return parametros.toString();
}

export default function Pagina() {
  const [filtros, setFiltros] = useState({
    grupo: "todos",
    anio: "todos",
    mes: "todos",
    regional: "todas",
  });

  const [opcionesFiltro, setOpcionesFiltro] = useState({});
  const [kpis, setKpis] = useState(null);
  const [tiempo, setTiempo] = useState([]);
  const [topMedicamentos, setTopMedicamentos] = useState([]);
  const [costoPbs, setCostoPbs] = useState([]);
  const [costoDepartamento, setCostoDepartamento] = useState([]);
  const [costoEntrega, setCostoEntrega] = useState([]);
  const [antidiabeticos, setAntidiabeticos] = useState(null);
  const [cargando, setCargando] = useState(true);

  const manejarCambioFiltro = useCallback((llave, valor) => {
    if (llave === "reset") {
      setFiltros(valor);
      return;
    }
    setFiltros((anterior) => ({ ...anterior, [llave]: valor }));
  }, []);

  // Las opciones de los selectores y el análisis de antidiabéticos solo
  // se piden una vez, no dependen de los filtros que el usuario mueve.
  useEffect(() => {
    fetch("/api/filtros")
      .then((r) => r.json())
      .then(setOpcionesFiltro);
    fetch("/api/antidiabeticos")
      .then((r) => r.json())
      .then(setAntidiabeticos);
  }, []);

  // Todo lo demás sí depende de los filtros globales, así que se vuelve
  // a pedir cada vez que filtros cambia.
  useEffect(() => {
    setCargando(true);
    const qs = aQueryString(filtros);
    const sufijo = qs ? `?${qs}` : "";

    Promise.all([
      fetch(`/api/kpis${sufijo}`).then((r) => r.json()),
      fetch(`/api/dispensacion-tiempo${sufijo}`).then((r) => r.json()),
      fetch(`/api/top-medicamentos${sufijo}`).then((r) => r.json()),
      fetch(`/api/costo-pbs${sufijo}`).then((r) => r.json()),
      fetch(`/api/costo-departamento${sufijo}`).then((r) => r.json()),
      fetch(`/api/costo-entrega${sufijo}`).then((r) => r.json()),
    ]).then(([k, t, tm, cp, cd, ce]) => {
      setKpis(k);
      setTiempo(t);
      setTopMedicamentos(tm);
      setCostoPbs(cp);
      setCostoDepartamento(cd);
      setCostoEntrega(ce);
      setCargando(false);
    });
  }, [filtros]);

  return (
    <main className="min-h-screen">
      {/* HERO: Portada con storytelling e impacto visual */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-16 pb-12 text-center md:pt-24 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            EPS · Auditoría y Análisis de Dispensación 2020 - 2021
          </div>

          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Cada fórmula dispensada cuenta <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">una historia de salud</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            Exploración analítica sobre <strong>28.482 dispensaciones</strong>, <strong>1.000 pacientes</strong> y <strong>10.005 fórmulas médicas</strong> con motor SQL real para entender patrones de costo, adherencia y concentración del gasto farmacéutico.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1">Base de Datos: SQLite / WebAssembly</span>
            <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1">24 Meses Auditados</span>
            <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1">Filtros Reactivos en Vivo</span>
          </div>
        </motion.div>
      </section>

      {/* MARCO CONTENEDOR TIPO TABLERO */}
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl border border-slate-700/80 bg-slate-950/60 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
          <BarraFiltros opciones={opcionesFiltro} filtros={filtros} onCambiar={manejarCambioFiltro} />

          <div className="space-y-12 p-5 sm:p-7 md:p-10">
            {/* BLOQUE 1: KPIs que abren la historia */}
        <SeccionRevelada>
          <div className="mb-6 flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Punto de partida</p>
              <h2 className="text-2xl font-black tracking-tight text-white">
                El tamaño del reto, en tres números
              </h2>
            </div>
            <p className="text-xs text-slate-400">Métricas agregadas según los filtros seleccionados</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <TarjetaKpi
              etiqueta="Personas con dispensaciones"
              valor={kpis?.personas}
              acento="eps"
              descripcion="pacientes únicos atendidos en el periodo seleccionado"
            />
            <TarjetaKpi
              etiqueta="Fórmulas distintas dispensadas"
              valor={kpis?.formulas}
              acento="salud"
              descripcion="órdenes médicas individuales procesadas"
            />
            <TarjetaKpi
              etiqueta="Costo promedio por fórmula"
              valor={kpis?.costo_promedio_formula}
              esMoneda
              acento="alerta"
              descripcion="inversión promedio por fórmula completa dispensada"
            />
          </div>
        </SeccionRevelada>

        {/* BLOQUE 2: Evolución temporal */}
        <SeccionRevelada delay={0.05}>
          <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
            <div className="mb-6">
              <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                Evolución Histórica
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                La marea del gasto mes a mes
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">
                El costo dispensado presenta fluctuaciones estacionales. Evalúa picos de demanda y el impacto de los filtros de grupo farmacológico en el tiempo.
              </p>
            </div>

            {tiempo.length ? (
              <GraficoTiempo datos={tiempo} />
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                No se encontraron datos para la combinación de filtros actual.
              </div>
            )}
          </div>
        </SeccionRevelada>

        {/* BLOQUE 3: Top Medicamentos */}
        <SeccionRevelada delay={0.05}>
          <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
            <div className="mb-6">
              <span className="inline-block rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400 border border-rose-500/20 uppercase tracking-wider">
                Concentración del Gasto
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                Los diez medicamentos con mayor peso financiero
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">
                Una pequeña fracción de moléculas concentra la mayor parte del presupuesto. Identificar estos tratamientos es clave para negociaciones y gestión de inventario.
              </p>
            </div>

            {topMedicamentos.length ? (
              <GraficoTopMedicamentos datos={topMedicamentos} />
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                No se encontraron datos para la combinación de filtros actual.
              </div>
            )}
          </div>
        </SeccionRevelada>

        {/* BLOQUE 4: Comparativas PBS y Entrega */}
        <div className="grid gap-8 md:grid-cols-2">
          <SeccionRevelada delay={0.05}>
            <div className="h-full rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
              <div className="mb-4">
                <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                  Cobertura y Plan
                </span>
                <h2 className="mt-2 text-xl font-bold text-white">
                  Medicamentos dentro vs fuera del PBS
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  El gasto no cubierto por el Plan de Beneficios en Salud representa una carga presupuestal crítica para la entidad.
                </p>
              </div>

              {costoPbs.length ? (
                <GraficoPBS datos={costoPbs} />
              ) : (
                <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                  Sin datos registrados.
                </div>
              )}
            </div>
          </SeccionRevelada>

          <SeccionRevelada delay={0.1}>
            <div className="h-full rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
              <div className="mb-4">
                <span className="inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                  Canal Logístico
                </span>
                <h2 className="mt-2 text-xl font-bold text-white">
                  Modalidad de dispensación
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  Distribución del costo entre retiro presencial en punto de atención vs entrega a domicilio.
                </p>
              </div>

              {costoEntrega.length ? (
                <GraficoEntrega datos={costoEntrega} />
              ) : (
                <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                  Sin datos registrados.
                </div>
              )}
            </div>
          </SeccionRevelada>
        </div>

        {/* BLOQUE 5: Distribución Territorial */}
        <SeccionRevelada delay={0.05}>
          <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
            <div className="mb-6">
              <span className="inline-block rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20 uppercase tracking-wider">
                Geografía del Gasto
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                Distribución por departamento
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">
                La barra en <strong className="text-amber-400 font-semibold">ámbar (Sin Asignar)</strong> evidencia registros sin departamento registrado en el sistema fuente, lo cual orienta auditorías de calidad de datos.
              </p>
            </div>

            {costoDepartamento.length ? (
              <GraficoDepartamento datos={costoDepartamento} />
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                No se encontraron datos para la combinación de filtros actual.
              </div>
            )}
          </div>
        </SeccionRevelada>

        {/* BLOQUE 6: Análisis Especial de Cierre - Antidiabéticos */}
        <SeccionRevelada delay={0.05}>
          <SeccionAntidiabeticos datos={antidiabeticos} />
        </SeccionRevelada>
          </div>
        </div>
      </div>

      {cargando && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-sky-500/30 bg-slate-900/95 px-4 py-2 text-xs font-medium text-sky-300 shadow-2xl backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
          Consultando base de datos SQL...
        </div>
      )}
    </main>
  );
}

